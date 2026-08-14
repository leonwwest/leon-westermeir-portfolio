# Leon Westermeir — Engineering Portfolio

Personal portfolio for Microsoft, Infrastructure, Cloud and Automation roles. The site presents a privately operated Work OS and five reproducible engineering labs as inspectable systems: real captures, test counts, technical decisions, public repositories and explicit production boundaries.

## Design direction

The interface is a **Systems Dispatch Board** rather than a conventional portfolio card grid. Warm paper surfaces, graphite structures and a single signal green create the visual language of a commissioning report. All project visuals are real captures from the linked repositories; no generated decorative imagery is used.

The product brief is in [`PRODUCT.md`](./PRODUCT.md). Research artifacts and the persisted design system are kept alongside the code for traceability.

## Local development

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm test
npm run lint
npm run build
```

The test command creates the Sites/Vinext build and verifies the server-rendered portfolio and legal routes. `npm run build` validates the Next.js production path used by the custom Vercel domain.

## Public surface

- Intended domain: [ibmw-automations.de](https://ibmw-automations.de)
- GitHub: [github.com/leonwwest](https://github.com/leonwwest)
- Contact: [leon.westermeir@ibmw-engineering.com](mailto:leon.westermeir@ibmw-engineering.com)

## Accuracy

The five public systems are reproducible labs. Leon Work OS is privately operated on personal infrastructure. Both show an engineering approach to architecture, automation, tests and operational handover; neither is presented as a deployment in a third-party production environment.
