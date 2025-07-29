# My Portfolio

A modern, personal portfolio website built with React, TypeScript, Tailwind CSS, and Vite.

## Features

- Clean, minimal design with soft pink accent color
- Role-based content display (Designer/Developer)
- Smooth animations using Framer Motion
- Responsive layout for all device sizes
- Contact form with EmailJS integration
- Modern icon system with Lucide React

## Technologies Used

- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React
- EmailJS
- Vite

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## EmailJS Setup

To enable the contact form functionality:

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/)
2. Create a new service (e.g., Gmail, Outlook)
3. Create a new email template with the following variables:
   - `{{name}}`
   - `{{email}}`
   - `{{message}}`
4. Open `src/components/ContactForm.tsx` and update the following with your EmailJS credentials:
   ```typescript
   const result = await emailjs.sendForm(
     'YOUR_SERVICE_ID',    // e.g., 'service_xxxxxxx'
     'YOUR_TEMPLATE_ID',   // e.g., 'template_xxxxxxx'
     formRef.current!,
     'YOUR_PUBLIC_KEY'     // e.g., 'user_xxxxxxxxxxxxxxxxxx'
   );
   ```
## Customization

- Update personal information in the components
- Modify color scheme in `index.css` (primary pink color: `#FBD1D9`)
- Add or remove sections as needed
- Update project examples in `ProjectsGallery.tsx`

## Build for Production

```bash
npm run build
```

## License

MIT
