# Leon Westermeir - DevOps & Cloud Platform Portfolio

[![CI](https://github.com/leonwwest/leon-westermeir-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/leonwwest/leon-westermeir-portfolio/actions/workflows/ci.yml)

Personal portfolio for DevOps, Cloud Platform and Infrastructure Automation roles. The fastest review path leads through Azure Infrastructure as Code, Kubernetes GitOps and Incident Automation before showing Microsoft governance automation and a privately operated Work OS.

## Design direction

The interface is a **Systems Evidence Board** rather than a conventional portfolio card grid. Warm paper surfaces, graphite structures and a single signal green create the visual language of a commissioning report. The hero and project console use real execution captures from the linked repositories; no generated decorative imagery is used.

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

Every push to `main` and every pull request runs a clean install, lint, the Next.js production build and the rendered-route test suite in GitHub Actions.

## Public surface

- Intended domain: [ibmw-automations.de](https://ibmw-automations.de)
- GitHub: [github.com/leonwwest](https://github.com/leonwwest)
- Contact: [leon.westermeir@ibmw-engineering.com](mailto:leon.westermeir@ibmw-engineering.com)

## Accuracy

The four public core systems are reproducible labs. Leon Work OS is privately operated on personal infrastructure. Both show an engineering approach to architecture, delivery, observability, automation and recovery; neither is presented as a deployment in a third-party production environment.
