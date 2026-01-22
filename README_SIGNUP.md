<!-- @format -->

# TCon360 User Registration & Signup Specification (Revised)

This document provides an updated specification for the user registration and signup procedure for the TCon360 application, based on the requirements of the frontend signup page and backend user controller.

## 1. Analysis of Signup Procedure

### Required Information

To support the Excel timesheet generation service and organizational requirements, the registration process must collect and store the following essential information for every user, organized into three main steps:

#### Step 1: Login Details

- **Email Address:** User's primary email (e.g., `username@department.gov.hk`).
- **User Name:** Unique identifier for login.
- **Password:** Secure access credential.

#### Step 2: T-contract Staff Details

- **Name of Staff:** Full name of the employee.
- **Name of T-contractor (Agent Name):** The contractor agency name.
- **Staff Category:** The category/level of the staff.
- **Department:** The government department assigned to.
- **Post Unit:** The specific unit within the department.
- **Contract Start Date:** Official commencement date.
- **Contract End Date:** Official expiry date.
- **Total Annual Leave:** Allocated leave for the contract period.

#### Step 3: Timesheet Certifying Officer

- **Manager Name:** Full name of the certifying officer.
- **Designation (Manager Post Title):** The official post title of the manager.
- **Manager Email:** Contact email for the certifying officer (used for approvals).

### Implementation Logic

The backend user creation payload must include these fields. The system is responsible for:

- Validating the presence and format of all mandatory fields across all steps.
- Ensuring `username` and `email` are unique.
- Persisting staff and manager details as metadata associated with the user account.

---

## 2. Signup Workflow Details

### A. Traditional Email Registration

This is a multi-step process implemented using a Stepper component.

**Workflow:**

1.  **Page:** `/signup` (Implementation at `/TCon360/frontend/app/signup/page.tsx`)
2.  **Navigation:**
    - **Step 0:** Login details (Email, Username, Password).
    - **Step 1:** Staff details (Staff Name, Agent, Category, Dept, Post Unit, Dates, Leave).
    - **Step 2:** Certifying Officer details (Manager Name, Title, Email).
    - **Step 3:** Review and Submit.
3.  **Submission:** The frontend sends a POST request to `${basepath}/api/user/signup` containing the account credentials and the `staff` metadata object.
4.  **Verification:** Backend validates the payload and checks for existing users.
5.  **Access:** Upon success, the user is logged in and redirected to the dashboard.

### B. Google Account Integration (Optional)

Google integration serves as an optional social login provider.

**Workflow:**

1.  **Initiation:** User clicks "Sign up with Google".
2.  **Authentication:** User completes OAuth flow.
3.  **Profile Completion (Onboarding):**
    - Google only provides basic identity (Name, Email).
    - Since the **Staff Details** and **Certifying Officer Details** are mandatory for timesheet generation, the system MUST redirect new Google users to a profile completion page.
    - This page will collect the information usually found in Steps 1 and 2 of the traditional signup.
4.  **Finalization:** Once the profile is complete, the user account is fully activated for timesheet operations.

---

## 3. Integration with Excel Timesheet Manipulation

The background service requires this metadata to accurately populate Excel timesheet templates.

| Field                   | Source                    | Excel Mapping      |
| :---------------------- | :------------------------ | :----------------- |
| **Staff Name**          | `StaffName`               | Employee Name      |
| **Agent Name**          | `AgentName`               | Contractor/Agent   |
| **Staff Category**      | `StaffCategory`           | Category           |
| **Department/Unit**     | `Department` / `PostUnit` | Department / Post  |
| **Certifying Officer**  | `ManagerName`             | Approved By (Name) |
| **Officer Designation** | `ManagerTitle`            | Approved By (Post) |

---

## 4. Implementation Strategy

1.  **Mandatory Metadata:** All staff and manager fields are required. The system will prevent timesheet generation if these fields are incomplete.
2.  **Validation:** Frontend uses Mantine `useForm` for real-time validation across stepper steps.
3.  **Feature Flagging:** Google signup is optional and visibility is controlled via environment configuration.
4.  **Uniform Data Structure:** Whether registered via Email or Google, the resulting user object will have a consistent `staff` metadata structure to ensure compatibility with the background NestJS app.
