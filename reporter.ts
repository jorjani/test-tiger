export function generateReport(results: any) {
  console.log(`\n🔍 QA Report: ${results.url}`);
  console.log("=".repeat(40));
  for (const key in results) {
    if (key !== "url") {
      console.log(`🧩 ${key.toUpperCase()}:`);
      console.log(results[key]);
    }
  }
}

