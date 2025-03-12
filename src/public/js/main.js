document.addEventListener("DOMContentLoaded", () => {
    const taalSelect = document.getElementById("taal");
    const tagsSelect = document.getElementById("tags");
    const errorDiv = document.getElementById("error");
    const snippetsContainer = document.getElementById("snippets");
    let selectedTaal = taalSelect.value;
    let selectedTags = tagsSelect.value;

    const fetchData = () => {
        const url = `/api/snippets?language=${selectedTaal}&tags=${selectedTags}`;
        console.log("Fetch naar URL:", url);

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Fout bij ophalen van data: ${response.statusText}`
                    );
                }
                return response.json();
            })
            .then((data) => {
                console.log("Ontvangen data:", data);

                snippetsContainer.innerHTML = "";
                errorDiv.textContent = "";

                if (data.length === 0) {
                    errorDiv.textContent = "Geen snippets gevonden";
                } else {
                    const table = document.createElement("table");
                    table.innerHTML = `
              <thead>
                <tr>
                  <th>Titel</th>
                  <th>Language</th>
                  <th>Code</th>
                  <th>Tags</th>
                </tr>
              </thead>
              <tbody></tbody>
            `;
                    const tbody = table.querySelector("tbody");

                    data.forEach((snippet) => {
                        const tr = document.createElement("tr");
                        tr.innerHTML = `
                <td>${snippet.title}</td>
                <td>${snippet.language}</td>
                <td><pre>${snippet.code}</pre></td>
                <td>${
                    Array.isArray(snippet.tags)
                        ? snippet.tags.join(", ")
                        : snippet.tags
                }</td>
              `;
                        tbody.appendChild(tr);
                    });

                    snippetsContainer.appendChild(table);
                }
            })
            .catch((error) => {
                errorDiv.textContent = error.message;
                console.error("Er is een fout opgetreden:", error);
            });
    };

    taalSelect.addEventListener("change", (event) => {
        selectedTaal = event.target.value;
        fetchData();
    });

    tagsSelect.addEventListener("change", (event) => {
        selectedTags = event.target.value;
        fetchData();
    });

    fetchData();
});
