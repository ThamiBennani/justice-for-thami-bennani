#!/usr/bin/env bash
set -euo pipefail

: "${EMAIL_HASH_SALT:?Set EMAIL_HASH_SALT in your terminal first}"
: "${ACS_EMAIL_CONNECTION_STRING:?Set ACS_EMAIL_CONNECTION_STRING in your terminal first}"
: "${ACS_EMAIL_SENDER_ADDRESS:?Set ACS_EMAIL_SENDER_ADDRESS in your terminal first}"
: "${AZURE_SUBSCRIPTION_ID:?Set AZURE_SUBSCRIPTION_ID to the intended Azure subscription}"
: "${PUBLIC_ORIGINS:?Set PUBLIC_ORIGINS to comma-separated HTTPS website origins}"

RESOURCE_GROUP="${AZURE_RESOURCE_GROUP:-justice-for-thami}"
LOCATION="${AZURE_LOCATION:-canadacentral}"
SUFFIX="${AZURE_RESOURCE_SUFFIX:-$(openssl rand -hex 4)}"
STORAGE_ACCOUNT="${AZURE_STORAGE_ACCOUNT:-thamiactions${SUFFIX}}"
FUNCTION_APP="${AZURE_FUNCTION_APP:-thami-public-actions-${SUFFIX}}"
PACKAGE_PATH="$(pwd)/api/function.zip"
IFS=',' read -r -a CORS_ORIGINS <<< "$PUBLIC_ORIGINS"
for index in "${!CORS_ORIGINS[@]}"; do
  CORS_ORIGINS[$index]="$(printf '%s' "${CORS_ORIGINS[$index]}" | tr -d '[:space:]')"
done

cleanup() {
  rm -f "$PACKAGE_PATH"
  npm --prefix api install --include=dev >/dev/null 2>&1 || true
}
trap cleanup EXIT

if ! az account show >/dev/null 2>&1; then
  echo "Sign in first with: az login"
  exit 1
fi

az account set --subscription "$AZURE_SUBSCRIPTION_ID"
az provider register --namespace Microsoft.Storage --wait
az provider register --namespace Microsoft.Web --wait

az group create --name "$RESOURCE_GROUP" --location "$LOCATION" --output none
az storage account create \
  --name "$STORAGE_ACCOUNT" \
  --resource-group "$RESOURCE_GROUP" \
  --location "$LOCATION" \
  --sku Standard_LRS \
  --kind StorageV2 \
  --https-only true \
  --min-tls-version TLS1_2 \
  --allow-blob-public-access false \
  --output none

az functionapp create \
  --name "$FUNCTION_APP" \
  --resource-group "$RESOURCE_GROUP" \
  --storage-account "$STORAGE_ACCOUNT" \
  --consumption-plan-location "$LOCATION" \
  --functions-version 4 \
  --runtime node \
  --runtime-version 22 \
  --os-type Linux \
  --disable-app-insights true \
  --output none

az functionapp update \
  --name "$FUNCTION_APP" \
  --resource-group "$RESOURCE_GROUP" \
  --set httpsOnly=true \
  --output none

az functionapp cors add \
  --name "$FUNCTION_APP" \
  --resource-group "$RESOURCE_GROUP" \
  --allowed-origins "${CORS_ORIGINS[@]}" \
  --output none

TABLE_CONNECTION_STRING="$(az storage account show-connection-string --name "$STORAGE_ACCOUNT" --resource-group "$RESOURCE_GROUP" --query connectionString --output tsv)"
az functionapp config appsettings set \
  --name "$FUNCTION_APP" \
  --resource-group "$RESOURCE_GROUP" \
  --settings \
    "TABLE_STORAGE_CONNECTION_STRING=$TABLE_CONNECTION_STRING" \
    "EMAIL_HASH_SALT=$EMAIL_HASH_SALT" \
    "ACS_EMAIL_CONNECTION_STRING=$ACS_EMAIL_CONNECTION_STRING" \
    "ACS_EMAIL_SENDER_ADDRESS=$ACS_EMAIL_SENDER_ADDRESS" \
    "ALLOWED_ORIGINS=$PUBLIC_ORIGINS" \
    "WEBSITE_NODE_DEFAULT_VERSION=~22" \
    "SCM_DO_BUILD_DURING_DEPLOYMENT=false" \
    "ENABLE_ORYX_BUILD=false" \
  --output none

npm --prefix api run clean
npm --prefix api run build
npm --prefix api prune --omit=dev
rm -f "$PACKAGE_PATH"
(
  cd api
  zip -qr function.zip host.json package.json package-lock.json dist node_modules
)
IFS=$'\t' read -r KUDU_USERNAME KUDU_PASSWORD < <(
  az functionapp deployment list-publishing-profiles \
    --name "$FUNCTION_APP" \
    --resource-group "$RESOURCE_GROUP" \
    --query "[?publishMethod=='ZipDeploy'] | [0].{username:userName,password:userPWD}" \
    --output tsv
)
DEPLOY_STATUS="$(curl \
  --silent \
  --show-error \
  --output /dev/null \
  --write-out '%{http_code}' \
  --user "$KUDU_USERNAME:$KUDU_PASSWORD" \
  --request POST \
  --data-binary "@$PACKAGE_PATH" \
  "https://${FUNCTION_APP}.scm.azurewebsites.net/api/zipdeploy?isAsync=false")"
if [[ "$DEPLOY_STATUS" != "200" && "$DEPLOY_STATUS" != "202" ]]; then
  echo "Function deployment failed with HTTP status $DEPLOY_STATUS"
  exit 1
fi

API_URL="https://${FUNCTION_APP}.azurewebsites.net/api/public-actions"
printf '\nAzure API deployed.\nFunction app: %s\nFrontend API URL: %s\n' "$FUNCTION_APP" "$API_URL"
printf 'Set GitHub repository variable VITE_PUBLIC_ACTIONS_URL to the frontend API URL above.\n'
