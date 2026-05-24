# Act2Vue — Formularis de Registre amb Vue 3

Projecte Vue 3 amb quatre pàgines, dos formularis de registre i connexió a una API fake (JSON Server).

---

## Requisits previs

- Node.js 18+
- npm

---

## Instal·lació

```bash
npm install
```

---

## Com arrencar el projecte

**IMPORTANT: cal obrir DOS terminals en paral·lel.**

### Terminal 1 — API fake (JSON Server)

```bash
npm run api
```

Aixeca un servidor REST a `http://localhost:3001`.  
Les dades es guarden a `db.json` (a l'arrel del projecte).  
Endpoint disponible: `GET/POST http://localhost:3001/users`

> Si no tens aquest terminal obert i envies el formulari, obtindràs l'error:
> `POST http://localhost:3001/users net::ERR_CONNECTION_REFUSED`

### Terminal 2 — Aplicació Vue

```bash
npm run dev
```

Obre `http://localhost:5173` al navegador.

---

## Estructura de pàgines

| Ruta | Pàgina | Contingut |
|------|--------|-----------|
| `/` | Home | Pàgina de benvinguda amb Lorem Ipsum |
| `/about` | About Us | Informació de l'empresa amb Lorem Ipsum |
| `/register1` | Register 1 | **Exercicis 1 i 2** |
| `/register2` | Register 2 | **Exercici 3** |

---

## On és cada exercici

### Exercici 1 — Formulari amb validació manual
**Fitxer:** `src/views/Register1View.vue`

Formulari de registre amb tots els camps requerits:

| Camp | Validació |
|------|-----------|
| Nom | Obligatori, mínim 2 caràcters |
| Cognoms | Obligatori, mínim 2 caràcters |
| Email | Obligatori, format vàlid |
| Telèfon | 9 dígits, comença per 6/7/8/9 |
| Data de Naixement | Format DD/MM/YYYY, edat mínima 16 anys |
| Contrasenya | Mínim 12 caràcters, majúscula, minúscula, número i caràcter especial |
| Verificació contrasenya | Ha de coincidir amb la contrasenya |
| Adreça | Obligatori, mínim 5 caràcters |
| Província | Select obligatori |
| Població | Select dinàmic (depèn de la província) |
| Codi Postal | 5 dígits, ha de coincidir amb el prefix de la província |

Tècniques usades:
- `reactive()` per a l'estat del formulari
- `computed()` per als errors i la barra de fortalesa de contrasenya
- `watch()` per resetejar població i CP quan canvia la província
- Errors mostrats únicament als camps ja visitats (`@blur` + `touched`)
- Avís de confirmació en registre correcte (substitueix el formulari)

---

### Exercici 2 — Enviament a API fake amb el hook corresponent
**Fitxer:** `src/composables/useRegister.js`

El composable `useRegister` és el **hook personalitzat** (equivalent als custom hooks de React).  
S'importa i s'usa a `Register1View.vue` i `Register2View.vue`.

```js
const { loading, error, success, savedUser, submitRegistration, reset } = useRegister()
```

- Fa un `POST` a `http://localhost:3001/users` amb **axios**
- Gestiona els estats `loading`, `error` i `success` de forma reactiva
- No envia la contrasenya en text pla (substituïda per `[protected]`)
- Desa `createdAt` amb la data i hora actuals

Les dades enviades queden guardades a `db.json` i es poden consultar a:
```
http://localhost:3001/users
```

---

### Exercici 3 — Formulari amb VeeValidate + Yup i Bootstrap
**Fitxer:** `src/views/Register2View.vue`

> **Nota:** L'enunciat menciona React Hook Form o Formik, que són llibreries de React.  
> En un projecte Vue, l'equivalent directe és **VeeValidate** (la llibreria de formularis  
> estàndard de l'ecosistema Vue). S'usa juntament amb **Yup** per a l'esquema de validació,  
> exactament igual que es faria amb React Hook Form + Yup en React.

Mateixos camps i validacions que Register1, però implementats de forma declarativa:

**Esquema Yup** (`yup.object({...})`):
- Defineix totes les regles de validació en un sol lloc
- Validació creuada entre camps (`verificacioContrasenya` comprova contra `contrasenya`)
- Test personalitzat per al codi postal (comprova el prefix de la província)

**VeeValidate** (`useForm` + `useField`):
- `useForm({ validationSchema: schema })` — connecta l'esquema Yup al formulari
- `useField('nomCamp')` — retorna `value`, `errorMessage`, `meta` i `field` per a cada input
- `v-bind="field"` — connecta l'input amb VeeValidate (gestiona `onBlur`, `onChange`, etc.)
- `handleSubmit(callback)` — valida tot el formulari i crida el callback si és vàlid
- `isSubmitting` — booleà reactiu que es gestiona automàticament durant l'enviament

**Bootstrap 5** per a tots els estils: `form-control`, `is-invalid`, `is-valid`, `invalid-feedback`, `input-group`, `progress`, etc.

---

## Estructura de fitxers

```
src/
├── main.js                     # Bootstrap 5 + Bootstrap Icons + Vue Router
├── App.vue                     # Layout: NavBar + <router-view>
├── router/
│   └── index.js                # Definició de les 4 rutes
├── components/
│   └── NavBar.vue              # Barra de navegació responsive (Bootstrap)
├── data/
│   └── provinces.js            # 52 províncies amb poblacions i prefix de CP
├── composables/
│   └── useRegister.js          # Hook: POST a l'API, gestió loading/error/success
└── views/
    ├── HomeView.vue            # Pàgina Home (Lorem Ipsum)
    ├── AboutView.vue           # Pàgina About Us (Lorem Ipsum)
    ├── Register1View.vue       # Exercicis 1 i 2: validació manual
    └── Register2View.vue       # Exercici 3: VeeValidate + Yup
```

---

## Dependències principals

| Paquet | Versió | Ús |
|--------|--------|----|
| `vue` | ^3.3 | Framework principal |
| `vue-router` | ^4.2 | Navegació entre pàgines |
| `bootstrap` | ^5.3 | CSS + components JS |
| `bootstrap-icons` | ^1.11 | Icones |
| `axios` | ^1.6 | Peticions HTTP a l'API |
| `vee-validate` | ^4.12 | Gestió de formularis (Exercici 3) |
| `yup` | ^1.3 | Esquema de validació (Exercici 3) |
| `json-server` | ^0.17 | API fake REST (dev) |

---

## Scripts disponibles

```bash
npm run dev      # Servidor de desenvolupament (http://localhost:5173)
npm run api      # JSON Server — API fake (http://localhost:3001)
npm run build    # Build de producció (carpeta dist/)
npm run preview  # Previsualitza el build de producció
```
