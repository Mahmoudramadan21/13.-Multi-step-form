# Multi-Step Subscription Form

A React-based multi-step form for selecting a subscription plan and add-ons. This project is built with React, Redux Toolkit, and Vite, and includes features like form validation, dynamic pricing, and a responsive design.

## Features

- **Multi-Step Form**: A step-by-step form to collect user information, select a subscription plan, choose add-ons, and review the summary.
- **Form Validation**: Real-time validation for personal information (name, email, phone).
- **Dynamic Pricing**: Adjusts prices based on the selected billing cycle (monthly/yearly).
- **Redux State Management**: Uses Redux Toolkit to manage form state across steps.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **Accessibility**: Built with accessibility in mind, including ARIA labels and keyboard navigation.

## Technologies Used

- **React**: JavaScript library for building the user interface.
- **Redux Toolkit**: State management for handling form data.
- **Vite**: Fast build tool for modern web development.
- **CSS**: Custom styling for the form and components.
- **Google Fonts**: Uses the Ubuntu font for typography.

## Installation

Clone the repository:

```bash
git clone https://github.com/Mahmoudramadan21/13.-Multi-step-form.git
cd multi-step-form
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open in your browser:

Visit [http://localhost:5173/](http://localhost:5173/) to view the application.

## Project Structure

```
multi-step-form/
├── public/                  # Static assets (e.g., icons)
├── src/
│   ├── assets/              # Images and icons
│   ├── components/          # Reusable components
│   ├── sections/            # Form sections (steps)
│   ├── redux/               # Redux store and slices
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Entry point
│   └── index.html           # HTML template
├── .gitignore               # Files to ignore in Git
├── package.json             # Project dependencies
├── README.md                # Project documentation
└── vite.config.js           # Vite configuration
```

## Usage

### Step 1: Personal Info

Enter your name, email, and phone number. The form validates inputs in real-time.

### Step 2: Select Plan

Choose a subscription plan (Arcade, Advanced, or Pro) and toggle between monthly and yearly billing.

### Step 3: Add-Ons

Select additional features like online service, larger storage, or customizable profile.

### Step 4: Summary

Review your selected plan, add-ons, and total cost. Confirm your subscription.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- **Vite**: For the fast and modern build tool.
- **Redux Toolkit**: For simplifying state management.
- **Google Fonts**: For providing the Ubuntu font.

## Contact

If you have any questions or feedback, feel free to reach out:

- **Email**: [mahmoud.fci@gmail.com](mailto:mahmoud.fci@gmail.com)
- **GitHub**: [Mahmoudramadan21](https://github.com/Mahmoudramadan21)
