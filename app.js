async function fetchStudentData() {
  const status = document.getElementById("statusText");
  const tbody = document.querySelector("#studentTable tbody");

  status.textContent = "Loading...";
  tbody.innerHTML = "";

  try {
    // IMPORTANT: This will call your Static Web App API
    const response = await fetch("/api/getStudentCount");

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("API did not return an array.");
    }

    tbody.innerHTML = data.map(row => `
      <tr>
        <td>${row.Country ?? ""}</td>
        <td>${row.StudentCount ?? ""}</td>
      </tr>
    `).join("");

    status.textContent = `Loaded ${data.length} rows ✅`;
  } catch (err) {
    status.textContent = `Failed ❌ ${err.message}`;
  }
}

document.getElementById("refreshBtn").addEventListener("click", fetchStudentData);

// Load once on page open
fetchStudentData();
