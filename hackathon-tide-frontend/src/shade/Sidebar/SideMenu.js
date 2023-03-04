export const MENUITEMS = [
  {
    // menutitle: "Main",
    Items: [
      {
        title: "Dashboard",
        path: `/dashboard`,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z" />
          </svg>
        ),
        type: "link",
        selected: false,
        active: false,
      },
      {
        title: "Send Amount",
        path: `/send-amount`,

        icon: (
          <svg xmlns="http://www.w3.org/2000/svg"
            class="side-menu__icon"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 2 .001 4H5V5h14zM5 11h8v8H5v-8zm10 8v-8h4.001l.001 8H15z"></path>
          </svg>
        ),

        type: "link",
        selected: false,
        active: false,
      },
    ],
  },
];
