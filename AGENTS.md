# Architecture

- Keep the restaurant experience as one long, anchor-navigated menu page because the approved design and task require a single scannable ordering surface.
- Store uploaded media through Lovable Assets pointers; keep generated food photography as imported app assets.
- Keep cart state in a shared React provider persisted to localStorage so menu and checkout stay synchronized without requiring sign-in.
