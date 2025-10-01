set -euo pipefail

TEST_CMD=$1
RESULTS_DIR=$2
PROJECT=$3

PREV_JSON="prevTestFilesReport.json"
CURR_JSON="e2e/test-results/$RESULTS_DIR/test-results.json"

mkdir -p "e2e/test-results/$RESULTS_DIR"

if [ "${RUN_PREV_FAILED_AND_NOT_EXECUTED_TEST_FILES:-false}" = "true" ] && [ -f "$PREV_JSON" ]; then

  failed_tests=$(jq -r \
    --arg project "$PROJECT" \
    '.suites[] | .. | objects | select(.project.name==$project and .status=="failed") | "\(.file)::\(.title)"' \
    "$PREV_JSON")

  if [ -n "$failed_tests" ]; then

    while IFS= read -r test; do
      file=$(echo "$test" | cut -d"::" -f1)
      title=$(echo "$test" | cut -d"::" -f2-)
      npx playwright test "$file" -g "$title" --project="$PROJECT" \
        --reporter=list,json --output="e2e/test-results/$RESULTS_DIR"
    done <<< "$failed_tests"

    exit 0
  else
    echo "No failed tests for project $PROJECT. Running full suite."
  fi
fi

yarn $TEST_CMD --reporter=list,json --output="e2e/test-results/$RESULTS_DIR"
