import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle, shell } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      {
        description: "Fn -> Control",
        from: {
          key_code: "fn",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "left_control",
          },
        ],
        type: "basic",
      },
      //      {
      //        type: "basic",
      //        description: "Disable CMD + Tab to force Hyper Key usage",
      //        from: {
      //          key_code: "tab",
      //          modifiers: {
      //            mandatory: ["left_command"],
      //          },
      //        },
      //        to: [
      //          {
      //            key_code: "tab",
      //          },
      //        ],
      //      },
    ],
  },
  {
    "description": "Left cmd + hjkl to arrow keys Vim",
    "manipulators": [
      {
        "from": {
          "key_code": "h",
          "modifiers": {
            "mandatory": [
              "right_command"
            ],
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "left_arrow"
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "key_code": "j",
          "modifiers": {
            "mandatory": [
              "right_command"
            ],
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "down_arrow"
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "key_code": "k",
          "modifiers": {
            "mandatory": [
              "right_command"
            ],
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "up_arrow"
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "key_code": "l",
          "modifiers": {
            "mandatory": [
              "right_command"
            ],
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "right_arrow"
          }
        ],
        "type": "basic"
      }
    ]
  },
  {
    "description": "Left CMD toggle lang",
    "manipulators": [
      {
        "conditions": [
          {
            "input_sources": [
              {
                "language": "en"
              }
            ],
            "type": "input_source_if"
          }
        ],
        "from": {
          "key_code": "left_command"
        },
        "to": [
          {
            "key_code": "left_command"
          }
        ],
        "to_if_alone": [
          {
            "select_input_source": {
              "language": "ru"
            }
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "input_sources": [
              {
                "language": "ru"
              }
            ],
            "type": "input_source_if"
          }
        ],
        "from": {
          "key_code": "left_command"
        },
        "to": [
          {
            "key_code": "left_command"
          }
        ],
        "to_if_alone": [
          {
            "select_input_source": {
              "language": "en"
            }
          }
        ],
        "type": "basic"
      }
    ]
  },

  ...createHyperSubLayers({
    spacebar: open(
      "raycast://extensions/stellate/mxstbr-commands/create-notion-todo"
    ),
    1: {
      description: "Hyper + 1: Desktop 1",
      to: [
        {
          key_code: "1",
          modifiers: ["control"],
        },
      ],
    },
    2: {
      description: "Hyper + 2: Desktop 2",
      to: [
        {
          key_code: "2",
          modifiers: ["control"],
        },
      ],
    },
    3: {
      description: "Hyper + 3: Desktop 3",
      to: [
        {
          key_code: "3",
          modifiers: ["control"],
        },
      ],
    },
    4: {
      description: "Hyper + 4: Desktop 4",
      to: [
        {
          key_code: "4",
          modifiers: ["control"],
        },
      ],
    },
    5: {
      description: "Hyper + 5: Desktop 5",
      to: [
        {
          key_code: "5",
          modifiers: ["control"],
        },
      ],
    },
    6: {
      description: "Hyper + 6: Desktop 6",
      to: [
        {
          key_code: "6",
          modifiers: ["control"],
        },
      ],
    },
    // b = "B"rowse
    b: {
      s: open("https://code.moba.live"),
    },
    // a = Applications
    a: {
      1: app("1Password"),
      d: app("Discord"),
      s: app("Slack"),
      t: app("Telegram"),
      m: app("Mail"),
      b: app("Arc"),
      c: app("Visual Studio Code"),
      // Open todo list managed via *H*ypersonic
      // "M"arkdown (Reflect.app)
      r: app("Reflect"),
      f: app("Finder"),
      o: app("Obsidian"),
      // "i"Message
      p: app("Spotify"),
      a: app("iA Presenter"),
    },

    // TODO: This doesn't quite work yet.
    // l = "Layouts" via Raycast's custom window management
    // l: {
    //   // Coding layout
    //   c: shell`
    //     open -a "Visual Studio Code.app"
    //     sleep 0.2
    //     open -g "raycast://customWindowManagementCommand?position=topLeft&relativeWidth=0.5"

    //     open -a "Terminal.app"
    //     sleep 0.2
    //     open -g "raycast://customWindowManagementCommand?position=topRight&relativeWidth=0.5"
    //   `,
    // },

    // w = "Window" via rectangle.app
    w: {
      semicolon: {
        description: "Window: Hide",
        to: [
          {
            key_code: "h",
            modifiers: ["right_command"],
          },
        ],
      },
      y: rectangle("previous-display"),
      o: rectangle("next-display"),
      k: rectangle("top-right"),
      j: rectangle("bottom-left"),
      h: rectangle("top-left"),
      l: rectangle("bottom-right"),
      f: rectangle("maximize"),
      u: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      i: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
      n: {
        description: "Window: Next Window",
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["right_command"],
          },
        ],
      },
      b: {
        description: "Window: Back",
        to: [
          {
            key_code: "open_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      // Note: No literal connection. Both f and n are already taken.
      m: {
        description: "Window: Forward",
        to: [
          {
            key_code: "close_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
    },

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
      e: open(
        `raycast://extensions/thomas/elgato-key-light/toggle?launchType=background`
      ),
      // "D"o not disturb toggle
      d: open(
        `raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background`
      ),
      // "T"heme
      t: open(`raycast://extensions/raycast/system/toggle-system-appearance`),
      c: open("raycast://extensions/raycast/system/open-camera"),
      // 'v'oice
      v: {
        to: [
          {
            key_code: "spacebar",
            modifiers: ["left_option"],
          },
        ],
      },
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      // Magicmove via homerow.app
      m: {
        to: [{ key_code: "f", modifiers: ["right_control"] }],
        // TODO: Trigger Vim Easymotion when VSCode is focused
      },
      // Scroll mode via homerow.app
      s: {
        to: [{ key_code: "j", modifiers: ["right_control"] }],
      },
      d: {
        to: [{ key_code: "d", modifiers: ["right_shift", "right_command"] }],
      },
      u: {
        to: [{ key_code: "page_down" }],
      },
      i: {
        to: [{ key_code: "page_up" }],
      },
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },

    // r = "Raycast"
    r: {
      c: open("raycast://extensions/thomas/color-picker/pick-color"),
      n: open("raycast://script-commands/dismiss-notifications"),
      l: open(
        "raycast://extensions/stellate/mxstbr-commands/create-mxs-is-shortlink"
      ),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
      s: open("raycast://extensions/peduarte/silent-mention/index"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      1: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1"
      ),
      2: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2"
      ),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
