async function decodeJD() {

    const jd = document.getElementById("jdInput").value;

    if (!jd.trim()) {
        alert("Enter Job Description!");
        return;
    }

    document.getElementById("loading").classList.remove("hidden");

    const response = await fetch("/decode", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ jd })
    });

    const data = await response.json();

    document.getElementById("loading").classList.add("hidden");

    const skillsList = document.getElementById("skillsList");
    const prepList = document.getElementById("prepList");
    const tagsDiv = document.getElementById("skillsTags");

    skillsList.innerHTML = "";
    prepList.innerHTML = "";
    tagsDiv.innerHTML = "";

    document.getElementById("levelBox").textContent =
        "🎯 Level: " + data.level;

    data.skills.forEach(skill => {
        let li = document.createElement("li");
        li.textContent = skill;
        skillsList.appendChild(li);

        let tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = skill;
        tagsDiv.appendChild(tag);
    });

    data.preparation.forEach(step => {
        let li = document.createElement("li");
        li.textContent = step;
        prepList.appendChild(li);
    });
}

// Copy
function copyResults() {
    let text = "";
    document.querySelectorAll("#skillsList li").forEach(li => {
        text += li.textContent + "\n";
    });
    navigator.clipboard.writeText(text);
    alert("Copied!");
}

// PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let text = "JD Decoder Result\n\n";

    document.querySelectorAll("#skillsList li").forEach(li => {
        text += "• " + li.textContent + "\n";
    });

    doc.text(text, 10, 10);
    doc.save("JD_Result.pdf");
}

// Dark mode
function toggleMode() {
    document.body.classList.toggle("light");
}