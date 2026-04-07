async function decodeJD() {
    const jd = document.getElementById("jdInput").value;
    const loading = document.getElementById("loading");
    const results = document.getElementById("results");

    loading.classList.remove("hidden");
    results.classList.add("hidden");

    const response = await fetch("http://localhost:3000/decode", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ jd })
    });

    const data = await response.json();

    loading.classList.add("hidden");
    results.classList.remove("hidden");

    const skillsList = document.getElementById("skillsList");
    const prepList = document.getElementById("prepList");

    skillsList.innerHTML = "";
    prepList.innerHTML = "";

    data.skills.forEach(skill => {
        const li = document.createElement("li");
        li.textContent = skill;
        skillsList.appendChild(li);
    });

    data.preparation.forEach(step => {
        const li = document.createElement("li");
        li.textContent = step;
        prepList.appendChild(li);
    });
}