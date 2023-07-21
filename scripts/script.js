import data from "./data.js";

const headingContainer = document.querySelector(".heading");
const parcelContainer = document.querySelector(".parcel-container");
let copyArr = data.slice()

function renderParcels() {
    // let sortByGroup = data.sort((a, b) => {
    //     if (a.group < b.group) return -1;
    //     if (a.group > b.group) return 1;
    //     return 0;
    // });
    headingContainer.innerHTML = "";
    parcelContainer.innerHTML = "";

    const ulHeading = document.createElement("ul");
    const ulParcel = document.createElement("ul");

    data?.forEach((parcel) => {
        const liHeading = document.createElement("li");
        const liParcel = document.createElement("li");
        const parcelName = document.createElement("span");
        const parcelSequence = document.createElement("span");
        const headingGroup = document.createElement("span");

        parcelName.textContent = parcel.name;
        parcelSequence.textContent = parcel.sequence;
        headingGroup.textContent = parcel.group;
        parcelSequence.addEventListener("click", function () {
            handleParcelSelection(parcel, parcelSequence);
        });

        parcelSequence.style.background = getGroupColor(parcel.group);
        headingGroup.style.background = getGroupColor(parcel.group);

        liHeading.append(headingGroup);
        liParcel.append(parcelName, parcelSequence);

        ulHeading.append(liHeading);
        ulParcel.append(liParcel);
    });

    headingContainer.append(ulHeading);
    parcelContainer.append(ulParcel);
}

function getGroupColor(groupName) {
    if (groupName === "Mumbai") {
        return "#f0155e";
    } else if (groupName === "Kolkata") {
        return "#3c79d8";
    } else {
        return "#f1c232";
    }
}

let selectedParcelId = null;
let prevSelectedParcel = null;

function handleParcelSelection(parcel, parcelSequence) {
    const selectedParcel = document.querySelector(".selected-parcel-text");

    if (selectedParcelId === parcel.id) {
        selectedParcelId = null;
        selectedParcel.style.border = "none";
        selectedParcel.textContent = "";
        if (prevSelectedParcel) {
            prevSelectedParcel.style.border = "none";
            prevSelectedParcel.removeAttribute("id");
        }
    } else {
        selectedParcelId = parcel.id;
        selectedParcel.textContent = parcel.name;
        selectedParcel.style.border = "1px solid green";
        selectedParcel.style.padding = "5px";
        if (prevSelectedParcel) {
            prevSelectedParcel.style.border = "none";
            prevSelectedParcel.removeAttribute("id");
        }
        parcelSequence.setAttribute("id", "selected-parcel");
        parcelSequence.style.border = "3px dashed green";
        prevSelectedParcel = parcelSequence;
    }
}

const parcelName = document.querySelector("#parcel-name");
const groupName = document.querySelector("#group-name");
const selectedParcel = document.querySelector(".selected-parcel-text");

function addAfter() {
    if (!selectedParcelId) {
        alert("Please select a parcel first.");
        return;
    }

    const inpuName = parcelName.value.trim();
    const selectGroup = groupName.value;

    if (inpuName === "" || selectGroup === "") {
        alert("Please enter a new parcel name and select a group.");
        return;
    }

    const newParcel = {
        id: Date.now(),
        name: inpuName,
        sequence: 0,
        group: selectGroup,
    };

    const selectedParcelIndex = data.findIndex(
        (parcel) => parcel.id === selectedParcelId
    );

    data.splice(selectedParcelIndex + 1, 0, newParcel);

    for (let i = selectedParcelIndex + 2; i < data.length; i++) {
        data[i].sequence++;
    }

    // selectedParcelId = null;

    selectedParcel.textContent = "";
    parcelName.value = "";
    groupName.value = "";

    console.log(data);
    renderParcels();
}
document.querySelector("#add-after").addEventListener("click", addAfter);

function addBefore() {
    if (!selectedParcelId) {
        alert("Please select a parcel first.");
        return;
    }

    const inpuName = parcelName.value.trim();
    const selectGroup = groupName.value;

    if (inpuName === "" || selectGroup === "") {
        alert("Please enter a new parcel name and select a group.");
        return;
    }

    const newParcel = {
        id: Date.now(),
        name: inpuName,
        sequence: 0,
        group: selectGroup,
    };

    const selectedParcelIndex = data.findIndex(
        (parcel) => parcel.id === selectedParcelId
    );

    data.splice(selectedParcelIndex, 0, newParcel);

    for (let i = selectedParcelIndex + 1; i < data.length; i++) {
        data[i].sequence++;
    }

    selectedParcelId = null;
    selectedParcel.textContent = "";
    parcelName.value = "";
    groupName.value = "";

    renderParcels();
}
document.querySelector("#add-before").addEventListener("click", addBefore);

function deleteParcel() {
    if (!selectedParcelId) {
        alert("Please select a parcel first.");
        return;
    }

    const selectedParcelIndex = data.findIndex(
        (parcel) => parcel.id === selectedParcelId
    );

    data.splice(selectedParcelIndex, 1);

    for (let i = selectedParcelIndex; i < data.length; i++) {
        data[i].sequence--;
    }

    selectedParcelId = null;
    selectedParcel.textContent = "";

    renderParcels();
}
document.querySelector("#delete").addEventListener("click", deleteParcel);

function replaceParcel() {
    if (!selectedParcelId) {
        alert("Please select a parcel first.");
        return;
    }

    const inputName = parcelName.value.trim();
    const selectGroup = groupName.value;

    if (inputName === "" || selectGroup === "") {
        alert("Please enter a new parcel name and select a group.");
        return;
    }

    const selectedParcelIndex = data.findIndex(
        (parcel) => parcel.id === selectedParcelId
    );

    const newParcel = {
        id: selectedParcelId,
        name: inputName,
        sequence: data[selectedParcelIndex].sequence,
        group: selectGroup,
    };

    data[selectedParcelIndex] = newParcel;

    selectedParcelId = null;
    selectedParcel.textContent = "";
    parcelName.value = "";
    groupName.value = "";

    renderParcels();
}
document.querySelector("#replace").addEventListener("click", replaceParcel);

function refreshParcel() {
    selectedParcelId = null;
    selectedParcel.textContent = "";

    parcelName.value = "";
    groupName.value = "";

    data = copyArr
    refreshParcel()
}
document.querySelector("#refresh").addEventListener("click", refreshParcel);

function showFinalData() {
    console.log(data);
}

renderParcels();
