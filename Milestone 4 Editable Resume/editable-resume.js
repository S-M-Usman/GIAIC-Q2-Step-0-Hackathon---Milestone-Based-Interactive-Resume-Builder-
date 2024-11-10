class EditableResume {
    constructor() {
        this.editableSections = {};
        this.initializeEditableSections();
        this.setupEventListeners();
        this.setupPreviewSection();
    }
    initializeEditableSections() {
        const sections = [
            "fullname_dsp",
            "designation_dsp",
            "phoneno_dsp",
            "email_dsp",
            "address_dsp",
            "summary_dsp",
        ];
        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                this.editableSections[id] = {
                    element,
                    value: element.textContent || "Double click to edit",
                    isEditing: false,
                };
                element.textContent || (element.textContent = "Double click to edit");
                this.makeEditable(id);
            }
        });
        // Initialize dynamic sections
        this.initializeDynamicSection("skills_dsp");
        this.initializeDynamicSection("achievements_dsp");
        this.initializeDynamicSection("experiences_dsp");
        this.initializeDynamicSection("educations_dsp");
        this.initializeDynamicSection("projects_dsp");
    }
    initializeDynamicSection(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.addEventListener("dblclick", (e) => {
                const target = e.target;
                if (target === container ||
                    !target.classList.contains("preview-item-val")) {
                    this.addNewItem(containerId);
                }
            });
        }
    }
    makeEditable(sectionId) {
        const section = this.editableSections[sectionId];
        if (!section)
            return;
        section.element.addEventListener("dblclick", () => {
            if (!section.isEditing) {
                this.startEditing(sectionId);
            }
        });
    }
    startEditing(sectionId) {
        const section = this.editableSections[sectionId];
        if (!section || section.isEditing)
            return;
        const currentText = section.element.textContent || "";
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentText === "Double click to edit" ? "" : currentText;
        input.className = "edit-input";
        // Style the input
        input.style.width = "100%";
        input.style.padding = "4px";
        input.style.border = "1px solid #ccc";
        input.style.borderRadius = "4px";
        input.style.fontSize = window.getComputedStyle(section.element).fontSize;
        input.style.color = "#000";
        // Replace content with input
        section.element.textContent = "";
        section.element.appendChild(input);
        input.focus();
        section.isEditing = true;
        // Handle save on enter or blur
        const saveChanges = () => {
            const newValue = input.value.trim() || "Double click to edit";
            section.value = newValue;
            section.element.textContent = newValue;
            section.isEditing = false;
            this.updateFormField(sectionId, newValue);
        };
        input.addEventListener("blur", saveChanges);
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                saveChanges();
            }
        });
    }
    updateFormField(sectionId, value) {
        const formFieldMap = {
            fullname_dsp: ".firstname",
            designation_dsp: ".designation",
            phoneno_dsp: ".phoneno",
            email_dsp: ".email",
            address_dsp: ".address",
            summary_dsp: ".summary",
        };
        const formFieldClass = formFieldMap[sectionId];
        if (formFieldClass) {
            const formField = document.querySelector(formFieldClass);
            if (formField) {
                formField.value = value;
                const generateCV = window.generateCV;
                if (typeof generateCV === "function") {
                    generateCV();
                }
            }
        }
    }
    addNewItem(containerId) {
        const container = document.getElementById(containerId);
        if (!container)
            return;
        const newItem = document.createElement("div");
        newItem.className = "preview-item";
        const newItemVal = document.createElement("span");
        newItemVal.className = "preview-item-val";
        newItemVal.textContent = "Double click to edit";
        newItem.appendChild(newItemVal);
        container.appendChild(newItem);
        const id = `${containerId}-${Date.now()}`;
        this.editableSections[id] = {
            element: newItemVal,
            value: newItemVal.textContent || "",
            isEditing: false,
        };
        this.makeEditable(id);
        this.startEditing(id);
    }
    setupPreviewSection() {
        const style = document.createElement("style");
        style.textContent = `
      .edit-input {
        background: white;
        color: black;
        width: 100%;
        padding: 4px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-family: inherit;
        font-size: inherit;
      }

      .preview-item-val {
        min-height: 1em;
        cursor: text;
        display: inline-block;
        width: 100%;
      }

      .preview-blk-list div {
        cursor: text;
      }

      [id$="_dsp"] {
        min-height: 1em;
      }
    `;
        document.head.appendChild(style);
    }
    setupEventListeners() {
        const form = document.querySelector(".cv-form");
        if (form) {
            form.addEventListener("input", (e) => {
                const target = e.target;
                if (target && target.classList) {
                    const value = target.value;
                    Object.keys(this.editableSections).forEach((sectionId) => {
                        const section = this.editableSections[sectionId];
                        if (section &&
                            target.classList.contains(sectionId.replace("_dsp", ""))) {
                            section.value = value;
                            section.element.textContent = value;
                        }
                    });
                }
            });
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    window.editableResume = new EditableResume();
});
