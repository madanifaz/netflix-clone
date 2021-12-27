# Netflix Clone

Website that can discover a movie, see a detail and watch a movie. (simulated), see demo page on [https://netlfix-clone-cinte-dyns.netlify.app/](https://netlfix-clone-cinte-dyns.netlify.app/)

## Technology Used

- Svelte-Kit
- Tailwindcss
- Typescript

## Developing

1. Clone this Repo
2. Copy .env from .env.example
3. Populate your Movie DB API_KEY to .env
4. npm install
5. npm run dev

## Folder Structure

- Svelte-kit using file system routing inside routes folder.
- Components Code reside in src/lib/Components
    - For Component that exclusively only used in one page will reside in same name with it routes /movies → src/lib/Components/movies
    - For Shared Component that used accross multiple page reside in /src/lib/Components/shared
    - For common component like modal, dropdown reside in /src/lib/Components/Common
- Store reside on /src/lib/Data
    - Interface for it data reside on /src/lib/Interfaces

## Feature List

- [x]  Locale Translation
    - [x]  Static Word
    - [x]  Movie Detail
- [x]  Search Movie
- [x]  Filter Movie By Genre (Dropdown (Desktop) / Accordion (Mobile)
- [x]  Animation On Page Transition and When Button Play Clicked
- [x]  State Management Using Store

## Add new Locales

1. Add new json file on locales folder
2. Import json file on src/lib/i18n.ts

```tsx
import en from '../../locales/en.json';
import id from '../../locales/id.json';
import fr from '../../locales/fr.json'

// Translation Object
const translations = {
	en: en,
	id: id,
	fr : fr
};

// locales Types must same sequence with translation
export type localeType = 'en' | 'id' | 'fr'
```

1. Restart dev server