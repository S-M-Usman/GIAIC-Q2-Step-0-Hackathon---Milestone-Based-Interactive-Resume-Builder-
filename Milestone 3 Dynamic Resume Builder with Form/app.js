var _a;
var ValidType;
(function (ValidType) {
    ValidType["TEXT"] = "text";
    ValidType["TEXT_EMP"] = "text_emp";
    ValidType["EMAIL"] = "email";
    ValidType["PHONENO"] = "phoneno";
    ValidType["ANY"] = "any";
})(ValidType || (ValidType = {}));
const strRegex = /^[a-zA-Z\s]*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const mainForm = document.getElementById("cv-form");
const imageElement = mainForm.image;
const firstnameElem = mainForm.firstname;
const middlenameElem = mainForm.middlename;
const lastnameElem = mainForm.lastname;
const designationElem = mainForm.designation;
const addressElem = mainForm.address;
const emailElem = mainForm.email;
const phonenoElem = mainForm.phoneno;
const summaryElem = mainForm.summary;
const imageDsp = document.getElementById("image_dsp");
const nameDsp = document.getElementById("fullname_dsp");
const phonenoDsp = document.getElementById("phoneno_dsp");
const emailDsp = document.getElementById("email_dsp");
const addressDsp = document.getElementById("address_dsp");
const designationDsp = document.getElementById("designation_dsp");
const summaryDsp = document.getElementById("summary_dsp");
const projectsDsp = document.getElementById("projects_dsp");
const achievementsDsp = document.getElementById("achievements_dsp");
const skillsDsp = document.getElementById("skills_dsp");
const educationsDsp = document.getElementById("educations_dsp");
const experiencesDsp = document.getElementById("experiences_dsp");
const fetchValues = (attrs, ...nodeLists) => {
    return Array.from(nodeLists[0]).map((_, i) => {
        return attrs.reduce((dataObj, attr, j) => {
            const element = nodeLists[j][i];
            dataObj[attr] = element ? element.value : "";
            return dataObj;
        }, {});
    });
};
const attachValidationListeners = () => {
    firstnameElem.addEventListener("keyup", (e) => validateFormData(e.target, ValidType.TEXT, "First Name"));
    middlenameElem.addEventListener("keyup", (e) => validateFormData(e.target, ValidType.TEXT_EMP, "Middle Name"));
    lastnameElem.addEventListener("keyup", (e) => validateFormData(e.target, ValidType.TEXT, "Last Name"));
    phonenoElem.addEventListener("keyup", (e) => validateFormData(e.target, ValidType.PHONENO, "Phone Number"));
    emailElem.addEventListener("keyup", (e) => validateFormData(e.target, ValidType.EMAIL, "Email"));
    addressElem.addEventListener("keyup", (e) => validateFormData(e.target, ValidType.ANY, "Address"));
    designationElem.addEventListener("keyup", (e) => validateFormData(e.target, ValidType.TEXT, "Designation"));
};
// Validation logic for user input
const validateFormData = (elem, elemType, elemName) => {
    if (elemType === ValidType.TEXT &&
        (!strRegex.test(elem.value) || elem.value.trim().length === 0))
        addErrMsg(elem, elemName);
    else if (elemType === ValidType.TEXT_EMP && !strRegex.test(elem.value))
        addErrMsg(elem, elemName);
    else if (elemType === ValidType.EMAIL &&
        (!emailRegex.test(elem.value) || elem.value.trim().length === 0))
        addErrMsg(elem, elemName);
    else if (elemType === ValidType.PHONENO &&
        (!phoneRegex.test(elem.value) || elem.value.trim().length === 0))
        addErrMsg(elem, elemName);
    else if (elemType === ValidType.ANY && elem.value.trim().length === 0)
        addErrMsg(elem, elemName);
    else
        removeErrMsg(elem);
};
const addErrMsg = (formElem, formElemName) => {
    formElem.nextElementSibling.textContent = `${formElemName} is invalid`;
};
const removeErrMsg = (formElem) => {
    formElem.nextElementSibling.textContent = "";
};
// Get user input values
const getUserInputs = () => {
    const achievementsTitleElem = document.querySelectorAll(".achieve_title");
    const achievementsDescriptionElem = document.querySelectorAll(".achieve_description");
    const expTitleElem = document.querySelectorAll(".exp_title");
    const expOrganizationElem = document.querySelectorAll(".exp_organization");
    const expLocationElem = document.querySelectorAll(".exp_location");
    const expStartDateElem = document.querySelectorAll(".exp_start_date");
    const expEndDateElem = document.querySelectorAll(".exp_end_date");
    const expDescriptionElem = document.querySelectorAll(".exp_description");
    const eduSchoolElem = document.querySelectorAll(".edu_school");
    const eduDegreeElem = document.querySelectorAll(".edu_degree");
    const eduCityElem = document.querySelectorAll(".edu_city");
    const eduStartDateElem = document.querySelectorAll(".edu_start_date");
    const eduGraduationDateElem = document.querySelectorAll(".edu_graduation_date");
    const eduDescriptionElem = document.querySelectorAll(".edu_description");
    const projTitleElem = document.querySelectorAll(".proj_title");
    const projLinkElem = document.querySelectorAll(".proj_link");
    const projDescriptionElem = document.querySelectorAll(".proj_description");
    const skillElem = document.querySelectorAll(".skill");
    // Attach validation listeners
    attachValidationListeners();
    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value,
        achievements: fetchValues(["achieve_title", "achieve_description"], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues([
            "exp_title",
            "exp_organization",
            "exp_location",
            "exp_start_date",
            "exp_end_date",
            "exp_description",
        ], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues([
            "edu_school",
            "edu_degree",
            "edu_city",
            "edu_start_date",
            "edu_graduation_date",
            "edu_description",
        ], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(["proj_title", "proj_link", "proj_description"], projTitleElem, projLinkElem, projDescriptionElem),
        skills: Array.from(skillElem).map((skill) => skill.value),
    };
};
const displayCV = (userData) => {
    nameDsp.textContent = `${userData.firstname} ${userData.middlename} ${userData.lastname}`;
    phonenoDsp.textContent = userData.phoneno;
    emailDsp.textContent = userData.email;
    addressDsp.textContent = userData.address;
    designationDsp.textContent = userData.designation;
    summaryDsp.textContent = userData.summary;
    // Clear and populate achievements
    achievementsDsp.innerHTML = "";
    userData.achievements.forEach((item) => {
        const itemElem = document.createElement("li");
        itemElem.textContent = `${item.achieve_title} | ${item.achieve_description}`;
        achievementsDsp.appendChild(itemElem);
    });
    // Clear and populate projects
    projectsDsp.innerHTML = "";
    userData.projects.forEach((item) => {
        const itemElem = document.createElement("li");
        itemElem.textContent = `${item.proj_title} | ${item.proj_link} | ${item.proj_description}`;
        projectsDsp.appendChild(itemElem);
    });
    // Clear and populate educations
    educationsDsp.innerHTML = "";
    userData.educations.forEach((item) => {
        const itemElem = document.createElement("li");
        itemElem.textContent = `${item.edu_school} | ${item.edu_degree} | ${item.edu_city} | ${item.edu_start_date} | ${item.edu_graduation_date} | ${item.edu_description}`;
        educationsDsp.appendChild(itemElem);
    });
    // Clear and populate experiences
    experiencesDsp.innerHTML = "";
    userData.experiences.forEach((item) => {
        const itemElem = document.createElement("li");
        itemElem.textContent = `${item.exp_title} | ${item.exp_organization} | ${item.exp_location} | ${item.exp_start_date} | ${item.exp_end_date} | ${item.exp_description}`;
        experiencesDsp.appendChild(itemElem);
    });
    // Clear and populate skills
    skillsDsp.innerHTML = "";
    skillsDsp.textContent = userData.skills.join(", ");
};
// Main function to generate CV and validate inputs
const generateCV = () => {
    const userData = getUserInputs();
    displayCV(userData);
};
// Add click event to the Generate CV button
(_a = document
    .getElementById("generate-cv-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", generateCV);
// Function to initialize repeaters for sections with the class 'repeater'
const initializeRepeater = () => {
    // Handle adding new items
    document.querySelectorAll(".repeater-add-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const repeaterContainer = button.closest(".repeater");
            if (repeaterContainer) {
                const itemTemplate = repeaterContainer.querySelector("[data-repeater-item]");
                if (itemTemplate) {
                    const newItem = itemTemplate.cloneNode(true);
                    resetRepeaterInputs(newItem);
                    repeaterContainer.insertBefore(newItem, button);
                    initializeRepeaterItem(newItem); // Reinitialize listeners on new item
                }
            }
        });
    });
    // Handle removing items
    document.querySelectorAll(".repeater-remove-btn").forEach((button) => {
        button.addEventListener("click", () => {
            var _a;
            const repeaterItem = button.closest("[data-repeater-item]");
            if (repeaterItem && ((_a = repeaterItem.parentElement) === null || _a === void 0 ? void 0 : _a.childElementCount) > 1) {
                repeaterItem.remove(); // Remove only if more than one item exists
            }
        });
    });
};
// Helper function to reset inputs in newly added repeater item
const resetRepeaterInputs = (item) => {
    item.querySelectorAll("input").forEach((input) => {
        input.value = "";
    });
};
// Helper to initialize event listeners and validation on a repeater item
const initializeRepeaterItem = (item) => {
    item.querySelectorAll("input").forEach((input) => {
        input.addEventListener("keyup", () => {
            const inputElement = input;
            switch (inputElement.classList[1]) {
                case "achieve_title":
                case "achieve_description":
                    validateFormData(inputElement, ValidType.TEXT, "Achievement");
                    break;
                case "exp_title":
                case "exp_organization":
                case "exp_location":
                    validateFormData(inputElement, ValidType.TEXT, "Experience");
                    break;
                // Add other cases as needed for other repeaters
            }
        });
    });
};
// Initialize repeaters on page load
document.addEventListener("DOMContentLoaded", () => {
    initializeRepeater();
});
// Rest of your existing generateCV, displayCV, and validation code...
const previewImage = () => {
    var _a;
    const file = (_a = imageElement.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            var _a;
            imageDsp.src = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(file);
    }
};
// Function to print CV
const printCV = () => {
    window.print();
};
