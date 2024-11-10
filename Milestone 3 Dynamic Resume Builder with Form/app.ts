interface Achievement {
  achieve_title: string;
  achieve_description: string;
}

interface Experience {
  exp_title: string;
  exp_organization: string;
  exp_location: string;
  exp_start_date: string;
  exp_end_date: string;
  exp_description: string;
}

interface Education {
  edu_school: string;
  edu_degree: string;
  edu_city: string;
  edu_start_date: string;
  edu_graduation_date: string;
  edu_description: string;
}

interface Project {
  proj_title: string;
  proj_link: string;
  proj_description: string;
}

interface UserData {
  firstname: string;
  middlename: string;
  lastname: string;
  designation: string;
  address: string;
  email: string;
  phoneno: string;
  summary: string;
  achievements: Achievement[];
  experiences: Experience[];
  educations: Education[];
  projects: Project[];
  skills: string[];
}
enum ValidType {
  TEXT = "text",
  TEXT_EMP = "text_emp",
  EMAIL = "email",
  PHONENO = "phoneno",
  ANY = "any",
}
const strRegex = /^[a-zA-Z\s]*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const mainForm = document.getElementById("cv-form") as HTMLFormElement;
const imageElement = mainForm.image;
const firstnameElem = mainForm.firstname as HTMLInputElement;
const middlenameElem = mainForm.middlename as HTMLInputElement;
const lastnameElem = mainForm.lastname as HTMLInputElement;
const designationElem = mainForm.designation as HTMLInputElement;
const addressElem = mainForm.address as HTMLInputElement;
const emailElem = mainForm.email as HTMLInputElement;
const phonenoElem = mainForm.phoneno as HTMLInputElement;
const summaryElem = mainForm.summary as HTMLInputElement;
const imageDsp = document.getElementById("image_dsp") as HTMLImageElement;
const nameDsp = document.getElementById("fullname_dsp") as HTMLElement;
const phonenoDsp = document.getElementById("phoneno_dsp") as HTMLElement;
const emailDsp = document.getElementById("email_dsp") as HTMLElement;
const addressDsp = document.getElementById("address_dsp") as HTMLElement;
const designationDsp = document.getElementById(
  "designation_dsp"
) as HTMLElement;
const summaryDsp = document.getElementById("summary_dsp") as HTMLElement;
const projectsDsp = document.getElementById("projects_dsp") as HTMLElement;
const achievementsDsp = document.getElementById(
  "achievements_dsp"
) as HTMLElement;
const skillsDsp = document.getElementById("skills_dsp") as HTMLElement;
const educationsDsp = document.getElementById("educations_dsp") as HTMLElement;
const experiencesDsp = document.getElementById(
  "experiences_dsp"
) as HTMLElement;

const fetchValues = <T extends object>(
  attrs: string[],
  ...nodeLists: NodeListOf<HTMLInputElement>[]
): T[] => {
  return Array.from(nodeLists[0]).map((_, i) => {
    return attrs.reduce((dataObj: any, attr, j) => {
      const element = nodeLists[j][i];
      dataObj[attr] = element ? element.value : "";
      return dataObj;
    }, {} as T);
  });
};

const attachValidationListeners = (): void => {
  firstnameElem.addEventListener("keyup", (e) =>
    validateFormData(e.target as HTMLInputElement, ValidType.TEXT, "First Name")
  );
  middlenameElem.addEventListener("keyup", (e) =>
    validateFormData(
      e.target as HTMLInputElement,
      ValidType.TEXT_EMP,
      "Middle Name"
    )
  );
  lastnameElem.addEventListener("keyup", (e) =>
    validateFormData(e.target as HTMLInputElement, ValidType.TEXT, "Last Name")
  );
  phonenoElem.addEventListener("keyup", (e) =>
    validateFormData(
      e.target as HTMLInputElement,
      ValidType.PHONENO,
      "Phone Number"
    )
  );
  emailElem.addEventListener("keyup", (e) =>
    validateFormData(e.target as HTMLInputElement, ValidType.EMAIL, "Email")
  );
  addressElem.addEventListener("keyup", (e) =>
    validateFormData(e.target as HTMLInputElement, ValidType.ANY, "Address")
  );
  designationElem.addEventListener("keyup", (e) =>
    validateFormData(
      e.target as HTMLInputElement,
      ValidType.TEXT,
      "Designation"
    )
  );
};

// Validation logic for user input
const validateFormData = (
  elem: HTMLInputElement,
  elemType: ValidType,
  elemName: string
): void => {
  if (
    elemType === ValidType.TEXT &&
    (!strRegex.test(elem.value) || elem.value.trim().length === 0)
  )
    addErrMsg(elem, elemName);
  else if (elemType === ValidType.TEXT_EMP && !strRegex.test(elem.value))
    addErrMsg(elem, elemName);
  else if (
    elemType === ValidType.EMAIL &&
    (!emailRegex.test(elem.value) || elem.value.trim().length === 0)
  )
    addErrMsg(elem, elemName);
  else if (
    elemType === ValidType.PHONENO &&
    (!phoneRegex.test(elem.value) || elem.value.trim().length === 0)
  )
    addErrMsg(elem, elemName);
  else if (elemType === ValidType.ANY && elem.value.trim().length === 0)
    addErrMsg(elem, elemName);
  else removeErrMsg(elem);
};

const addErrMsg = (formElem: HTMLInputElement, formElemName: string): void => {
  formElem.nextElementSibling!.textContent = `${formElemName} is invalid`;
};

const removeErrMsg = (formElem: HTMLInputElement): void => {
  formElem.nextElementSibling!.textContent = "";
};

// Get user input values
const getUserInputs = (): UserData => {
  const achievementsTitleElem = document.querySelectorAll(
    ".achieve_title"
  ) as NodeListOf<HTMLInputElement>;
  const achievementsDescriptionElem = document.querySelectorAll(
    ".achieve_description"
  ) as NodeListOf<HTMLInputElement>;
  const expTitleElem = document.querySelectorAll(
    ".exp_title"
  ) as NodeListOf<HTMLInputElement>;
  const expOrganizationElem = document.querySelectorAll(
    ".exp_organization"
  ) as NodeListOf<HTMLInputElement>;
  const expLocationElem = document.querySelectorAll(
    ".exp_location"
  ) as NodeListOf<HTMLInputElement>;
  const expStartDateElem = document.querySelectorAll(
    ".exp_start_date"
  ) as NodeListOf<HTMLInputElement>;
  const expEndDateElem = document.querySelectorAll(
    ".exp_end_date"
  ) as NodeListOf<HTMLInputElement>;
  const expDescriptionElem = document.querySelectorAll(
    ".exp_description"
  ) as NodeListOf<HTMLInputElement>;
  const eduSchoolElem = document.querySelectorAll(
    ".edu_school"
  ) as NodeListOf<HTMLInputElement>;
  const eduDegreeElem = document.querySelectorAll(
    ".edu_degree"
  ) as NodeListOf<HTMLInputElement>;
  const eduCityElem = document.querySelectorAll(
    ".edu_city"
  ) as NodeListOf<HTMLInputElement>;
  const eduStartDateElem = document.querySelectorAll(
    ".edu_start_date"
  ) as NodeListOf<HTMLInputElement>;
  const eduGraduationDateElem = document.querySelectorAll(
    ".edu_graduation_date"
  ) as NodeListOf<HTMLInputElement>;
  const eduDescriptionElem = document.querySelectorAll(
    ".edu_description"
  ) as NodeListOf<HTMLInputElement>;
  const projTitleElem = document.querySelectorAll(
    ".proj_title"
  ) as NodeListOf<HTMLInputElement>;
  const projLinkElem = document.querySelectorAll(
    ".proj_link"
  ) as NodeListOf<HTMLInputElement>;
  const projDescriptionElem = document.querySelectorAll(
    ".proj_description"
  ) as NodeListOf<HTMLInputElement>;
  const skillElem = document.querySelectorAll(
    ".skill"
  ) as NodeListOf<HTMLInputElement>;

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
    achievements: fetchValues(
      ["achieve_title", "achieve_description"],
      achievementsTitleElem,
      achievementsDescriptionElem
    ),
    experiences: fetchValues(
      [
        "exp_title",
        "exp_organization",
        "exp_location",
        "exp_start_date",
        "exp_end_date",
        "exp_description",
      ],
      expTitleElem,
      expOrganizationElem,
      expLocationElem,
      expStartDateElem,
      expEndDateElem,
      expDescriptionElem
    ),
    educations: fetchValues(
      [
        "edu_school",
        "edu_degree",
        "edu_city",
        "edu_start_date",
        "edu_graduation_date",
        "edu_description",
      ],
      eduSchoolElem,
      eduDegreeElem,
      eduCityElem,
      eduStartDateElem,
      eduGraduationDateElem,
      eduDescriptionElem
    ),
    projects: fetchValues(
      ["proj_title", "proj_link", "proj_description"],
      projTitleElem,
      projLinkElem,
      projDescriptionElem
    ),
    skills: Array.from(skillElem).map((skill) => skill.value),
  };
};

const displayCV = (userData: UserData): void => {
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
const generateCV = (): void => {
  const userData = getUserInputs();
  displayCV(userData);
};

// Add click event to the Generate CV button
document
  .getElementById("generate-cv-btn")
  ?.addEventListener("click", generateCV);

// Function to initialize repeaters for sections with the class 'repeater'
const initializeRepeater = (): void => {
  // Handle adding new items
  document.querySelectorAll(".repeater-add-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const repeaterContainer = button.closest(".repeater") as HTMLElement;
      if (repeaterContainer) {
        const itemTemplate = repeaterContainer.querySelector(
          "[data-repeater-item]"
        ) as HTMLElement;
        if (itemTemplate) {
          const newItem = itemTemplate.cloneNode(true) as HTMLElement;
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
      const repeaterItem = button.closest(
        "[data-repeater-item]"
      ) as HTMLElement;
      if (repeaterItem && repeaterItem.parentElement?.childElementCount! > 1) {
        repeaterItem.remove(); // Remove only if more than one item exists
      }
    });
  });
};

// Helper function to reset inputs in newly added repeater item
const resetRepeaterInputs = (item: HTMLElement): void => {
  item.querySelectorAll("input").forEach((input) => {
    (input as HTMLInputElement).value = "";
  });
};

// Helper to initialize event listeners and validation on a repeater item
const initializeRepeaterItem = (item: HTMLElement): void => {
  item.querySelectorAll("input").forEach((input) => {
    input.addEventListener("keyup", () => {
      const inputElement = input as HTMLInputElement;
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
const previewImage = (): void => {
  const file = imageElement.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      imageDsp.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

// Function to print CV
const printCV = (): void => {
  window.print();
};
