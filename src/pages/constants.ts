import { Children } from "react";

export const CLUSTER_META_DATA = [
  {
    name: "深圳研发",

    children: [
      {
        name: "前海-AZ03QH",
        children: [
          {
            name: "DMZ",
            children: [
              {
                name: "qhaz01m01",
              },
            ],
          },
          {
            name: "BIZ",
            children: [
              {
                name: "qhaz01m04",
              },
              {
                name: "qhaz01m02",
              },
            ],
          },
        ],
      },
      {
        name: "蛇口-AZ04SK",
        children: [
          {
            name: "DMZ",
            children: [
              {
                name: "skaz01m01",
              },
            ],
          },
          {
            name: "BIZ",
            children: [
              {
                name: "skaz01m04",
              },
              {
                name: "skaz01m02",
              },
            ],
          },
        ],
      },
      {
        name: "西丽-AZ05XL",
        children: [
          {
            name: "BIZ",
            children: [
              {
                name: "xlaz01m02",
              },
              {
                name: "xlaz01m04",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "深圳平湖",
    children: [
      {
        name: "平湖东-AZ11PH",
        children: [
          {
            name: "DMZ",
            children: [
              {
                name: "phaz11m01",
              },
              {
                name: "phaz11m03",
              },
            ],
          },
          {
            name: "BIZ",
            children: [
              {
                name: "phaz11m02",
              },
              {
                name: "phaz11m04",
              },
              {
                name: "phaz11m08",
              },
            ],
          },
        ],
      },
      {
        name: "平湖西-AZ12PH",
        children: [
          {
            name: "DMZ",
            children: [
              {
                name: "phaz12m01",
              },
              {
                name: "phaz12m03",
              },
            ],
          },
          {
            name: "BIZ",
            children: [
              {
                name: "phaz12m02",
              },
              {
                name: "phaz12m04",
              },
              {
                name: "phaz12m08",
              },
            ],
          },
        ],
      },
      {
        name: "吉华-AZ13JH",
        children: [
          {
            name: "BIZ",
            children: [
              {
                name: "jhaz13m02",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "上海",
    children: [
      {
        name: "上海-AZ21SH",
        children: [
          {
            name: "DMZ",
            children: [
              {
                name: "shaz21m03",
              },
              {
                name: "shaz21m01",
              },
            ],
          },
          {
            name: "BIZ",
            children: [
              {
                name: "shaz21m02",
              },
            ],
          },
        ],
      },
      {
        name: "上海-AZ22SH",
        children: [
          {
            name: "DMZ",
            children: [
              {
                name: "shaz22m01",
              },
              {
                name: "shaz22m03",
              },
            ],
          },
          {
            name: "BIZ",
            children: [
              {
                name: "shaz22m02",
              },
            ],
          },
        ],
      },
      {
        name: "锦绣-AZ23JX",
        children: [
          {
            name: "BIZ",
            children: [
              {
                name: "jxaz23m02",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const CLUSTER_META_DATA_TEST = [
  {
    name: "深圳研发",
    children: [
      {
        name: "前海-AZ03QH",
        children: [
          {
            netName: "DMZ",
            children: [
              {
                name: "qhaz01m04",
                Children: [{ clusterName: "cs-biz-07-dmz" }],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const CLUSTER_META_DATA_NEW = [
  {
    name: "深圳研发",
    type: "region",
    enName: "SZYF",
    children: [
      {
        name: "前海-AZ03QH",
        type: "az",
        enName: "QH-AZ03QH",
        children: [
          {
            name: "DMZ",
            type: "net",
            enName: "DMZ",
            children: [
              {
                name: "qhaz01m01",
                iaaSName: "AZ03QHM01",
                type: "mu",
                enName: "qhaz01m01",
                children: [
                  {
                    name: "qh-dmz-paas-migrate-1",
                    type: "cluster",
                    enName: "qh-dmz-paas-migrate-1",
                  },
                  {
                    name: "bcs-dmz-01-qh",
                    type: "cluster",
                    enName: "bcs-dmz-01-qh",
                  },
                ],
              },
            ],
          },
          {
            name: "BIZ",
            type: "net",
            enName: "BIZ",
            children: [
              {
                name: "qhaz01m04",
                iaaSName: "AZ03QHM04",
                type: "mu",
                enName: "qhaz01m04",
                children: [
                  {
                    name: "cs-biz-03-qh-sm",
                    type: "cluster",
                    enName: "cs-biz-03-qh-sm",
                  },
                  {
                    name: "cs-biz-06-qh",
                    type: "cluster",
                    enName: "cs-biz-06-qh",
                  },
                ],
              },
              {
                name: "qhaz01m02",
                iaaSName: "AZ03QHM02",
                type: "mu",
                enName: "qhaz01m02",
                children: [
                  {
                    name: "bcs-biz-01-qh",
                    type: "cluster",
                    enName: "bcs-biz-01-qh",
                  },
                  {
                    name: "cs-biz-02-qh-sm",
                    type: "cluster",
                    enName: "cs-biz-02-qh-sm",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "蛇口-AZ04SK",
        type: "az",
        enName: "SK-AZ04SK",
        children: [
          {
            name: "DMZ",
            type: "net",
            enName: "DMZ",
            children: [
              {
                name: "skaz01m01",
                iaaSName: "AZ04SKM01",
                type: "mu",
                enName: "skaz01m01",
                children: [
                  {
                    name: "bcs-dmz-01-sk",
                    type: "cluster",
                    enName: "bcs-dmz-01-sk",
                  },
                  {
                    name: "bcsdev-dmz-01-sk",
                    type: "cluster",
                    enName: "bcsdev-dmz-01-sk",
                  },
                ],
              },
            ],
          },
          {
            name: "BIZ",
            type: "net",
            enName: "BIZ",
            children: [
              {
                name: "skaz01m04",
                iaaSName: "AZ04SKM04",
                type: "mu",
                enName: "skaz01m04",
                children: [
                  {
                    name: "cs-biz-03-sk-sm",
                    type: "cluster",
                    enName: "cs-biz-03-sk-sm",
                  },
                  {
                    name: "cs-biz-06-sk",
                    type: "cluster",
                    enName: "cs-biz-06-sk",
                  },
                ],
              },
              {
                name: "skaz01m02",
                iaaSName: "AZ04SKM02",
                type: "mu",
                enName: "skaz01m02",
                children: [
                  {
                    name: "bcs-biz-01-sk",
                    type: "cluster",
                    enName: "bcs-biz-01-sk",
                  },
                  {
                    name: "cs-biz-02-xl-sm",
                    type: "cluster",
                    enName: "cs-biz-02-xl-sm",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "西丽-AZ05XL",
        type: "az",
        enName: "XL-AZ05XL",
        children: [
          {
            name: "BIZ",
            type: "net",
            enName: "BIZ",
            children: [
              {
                name: "xlaz01m02",
                iaaSName: "AZ05XLM02",
                type: "mu",
                enName: "xlaz01m02",
                children: [
                  {
                    name: "csuat-biz-02-xl-dw",
                    type: "cluster",
                    enName: "csuat-biz-02-xl-dw",
                  },
                  {
                    name: "cs-biz-01-win-xl",
                    type: "cluster",
                    enName: "cs-biz-01-win-xl",
                  },
                ],
              },
              {
                name: "xlaz01m04",
                iaaSName: "AZ05XLM04",
                type: "mu",
                enName: "xlaz01m04",
                children: null,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "深圳平湖",
    type: "region",
    enName: "SZPH",
    children: [
      {
        name: "平湖东-AZ11PH",
        type: "az",
        enName: "PHD-AZ11PH",
        children: [
          {
            name: "DMZ",
            type: "net",
            enName: "DMZ",
            children: [
              {
                name: "phaz11m01",
                iaaSName: "AZ11PHM01",
                type: "mu",
                enName: "phaz11m01",
                children: [
                  {
                    name: "cs-dmz-03-pd-bs",
                    type: "cluster",
                    enName: "cs-dmz-03-pd-bs",
                  },
                  {
                    name: "cs-dmz-02-pd-bs",
                    type: "cluster",
                    enName: "cs-dmz-02-pd-bs",
                  },
                ],
              },
              {
                name: "phaz11m03",
                iaaSName: "AZ11PHM03",
                type: "mu",
                enName: "phaz11m03",
                children: [
                  {
                    name: "cs-dmz-11-pd-mu03",
                    type: "cluster",
                    enName: "cs-dmz-11-pd-mu03",
                  },
                ],
              },
            ],
          },
          {
            name: "BIZ",
            type: "net",
            enName: "BIZ",
            children: [
              {
                name: "phaz11m02",
                iaaSName: "AZ11PHM02",
                type: "mu",
                enName: "phaz11m02",
                children: [
                  {
                    name: "cs-biz-07-pd",
                    type: "cluster",
                    enName: "cs-biz-07-pd",
                  },
                  {
                    name: "cs-biz-10-pd",
                    type: "cluster",
                    enName: "cs-biz-10-pd",
                  },
                ],
              },
              {
                name: "phaz11m04",
                iaaSName: "AZ11PHM04",
                type: "mu",
                enName: "phaz11m04",
                children: [
                  {
                    name: "cs-biz-13-pd-mu04",
                    type: "cluster",
                    enName: "cs-biz-13-pd-mu04",
                  },
                  {
                    name: "cs-biz-09-pd-mu04",
                    type: "cluster",
                    enName: "cs-biz-09-pd-mu04",
                  },
                ],
              },
              {
                name: "phaz11m08",
                iaaSName: "AZ11PHM08",
                type: "mu",
                enName: "phaz11m08",
                children: null,
              },
            ],
          },
        ],
      },
      {
        name: "平湖西-AZ12PH",
        type: "az",
        enName: "PHX-AZ12PH",
        children: [
          {
            name: "DMZ",
            type: "net",
            enName: "DMZ",
            children: [
              {
                name: "phaz12m01",
                iaaSName: "AZ12PHM01",
                type: "mu",
                enName: "phaz12m01",
                children: [
                  {
                    name: "cs-dmz-03-px-bs",
                    type: "cluster",
                    enName: "cs-dmz-03-px-bs",
                  },
                  {
                    name: "cs-dmz-02-px-bs",
                    type: "cluster",
                    enName: "cs-dmz-02-px-bs",
                  },
                ],
              },
              {
                name: "phaz12m03",
                iaaSName: "AZ12PHM03",
                type: "mu",
                enName: "phaz12m03",
                children: [
                  {
                    name: "cs-dmz-11-px-mu03",
                    type: "cluster",
                    enName: "cs-dmz-11-px-mu03",
                  },
                ],
              },
            ],
          },
          {
            name: "BIZ",
            type: "net",
            enName: "BIZ",
            children: [
              {
                name: "phaz12m02",
                iaaSName: "AZ12PHM02",
                type: "mu",
                enName: "phaz12m02",
                children: [
                  {
                    name: "cs-biz-04-px-mu02-na",
                    type: "cluster",
                    enName: "cs-biz-04-px-mu02-na",
                  },
                  {
                    name: "cs-biz-01-px-mu02-co",
                    type: "cluster",
                    enName: "cs-biz-01-px-mu02-co",
                  },
                ],
              },
              {
                name: "phaz12m04",
                iaaSName: "AZ12PHM04",
                type: "mu",
                enName: "phaz12m04",
                children: [
                  {
                    name: "cs-biz-13-px-mu04",
                    type: "cluster",
                    enName: "cs-biz-13-px-mu04",
                  },
                  {
                    name: "cs-biz-09-px-mu04",
                    type: "cluster",
                    enName: "cs-biz-09-px-mu04",
                  },
                ],
              },
              {
                name: "phaz12m08",
                iaaSName: "AZ12PHM08",
                type: "mu",
                enName: "phaz12m08",
                children: null,
              },
            ],
          },
        ],
      },
      {
        name: "吉华-AZ13JH",
        type: "az",
        enName: "JH-AZ13JH",
        children: [
          {
            name: "BIZ",
            type: "net",
            enName: "BIZ",
            children: [
              {
                name: "jhaz13m02",
                iaaSName: "AZ13JHM02",
                type: "mu",
                enName: "jhaz13m02",
                children: [
                  {
                    name: "cs-biz-10-jh",
                    type: "cluster",
                    enName: "cs-biz-10-jh",
                  },
                  {
                    name: "cs-biz-04-jh-mu02-na",
                    type: "cluster",
                    enName: "cs-biz-04-jh-mu02-na",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "上海",
    type: "region",
    enName: "SH",
    children: [
      {
        name: "上海-AZ21SH",
        type: "az",
        enName: "SH-AZ21SH",
        children: [
          {
            name: "DMZ",
            type: "net",
            enName: "DMZ",
            children: [
              {
                name: "shaz21m03",
                iaaSName: "AZ21SHM03",
                type: "mu",
                enName: "shaz21m03",
                children: [
                  {
                    name: "cs-dmz-10-ha-mu03",
                    type: "cluster",
                    enName: "cs-dmz-10-ha-mu03",
                  },
                  {
                    name: "bcs-dmz-01-ha-mu03-cc",
                    type: "cluster",
                    enName: "bcs-dmz-01-ha-mu03-cc",
                  },
                ],
              },
              {
                name: "shaz21m01",
                iaaSName: "AZ21SHM01",
                type: "mu",
                enName: "shaz21m01",
                children: [
                  {
                    name: "zhcs-dmz-01-ha",
                    type: "cluster",
                    enName: "zhcs-dmz-01-ha",
                  },
                  {
                    name: "cs-dmz-05-ha",
                    type: "cluster",
                    enName: "cs-dmz-05-ha",
                  },
                ],
              },
            ],
          },
          {
            name: "BIZ",
            type: "net",
            enName: "BIZ",
            children: [
              {
                name: "shaz21m02",
                iaaSName: "AZ21SHM02",
                type: "mu",
                enName: "shaz21m02",
                children: [
                  {
                    name: "cs-biz-02-ha-pl",
                    type: "cluster",
                    enName: "cs-biz-02-ha-pl",
                  },
                  {
                    name: "cs-biz-08-ha",
                    type: "cluster",
                    enName: "cs-biz-08-ha",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "上海-AZ22SH",
        type: "az",
        enName: "SH-AZ22SH",
        children: [
          {
            name: "DMZ",
            type: "net",
            enName: "DMZ",
            children: [
              {
                name: "shaz22m01",
                iaaSName: "AZ22SHM01",
                type: "mu",
                enName: "shaz22m01",
                children: [
                  {
                    name: "cs-dmz-05-hb",
                    type: "cluster",
                    enName: "cs-dmz-05-hb",
                  },
                  {
                    name: "ytbcs-dmz-01-hb",
                    type: "cluster",
                    enName: "ytbcs-dmz-01-hb",
                  },
                ],
              },
              {
                name: "shaz22m03",
                iaaSName: "AZ22SHM03",
                type: "mu",
                enName: "shaz22m03",
                children: [
                  {
                    name: "cs-dmz-10-hb-mu03",
                    type: "cluster",
                    enName: "cs-dmz-10-hb-mu03",
                  },
                  {
                    name: "bcs-dmz-01-hb-mu03-cc",
                    type: "cluster",
                    enName: "bcs-dmz-01-hb-mu03-cc",
                  },
                ],
              },
            ],
          },
          {
            name: "BIZ",
            type: "net",
            enName: "BIZ",
            children: [
              {
                name: "shaz22m02",
                iaaSName: "AZ22SHM02",
                type: "mu",
                enName: "shaz22m02",
                children: [
                  {
                    name: "cs-biz-02-hb-pl",
                    type: "cluster",
                    enName: "cs-biz-02-hb-pl",
                  },
                  {
                    name: "cs-biz-08-hb",
                    type: "cluster",
                    enName: "cs-biz-08-hb",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "锦绣-AZ23JX",
        type: "az",
        enName: "JX-AZ23JX",
        children: [
          {
            name: "BIZ",
            type: "net",
            enName: "BIZ",
            children: [
              {
                name: "jxaz23m02",
                iaaSName: "AZ23JXM02",
                type: "mu",
                enName: "jxaz23m02",
                children: [
                  {
                    name: "cs-biz-08-jx-mu02",
                    type: "cluster",
                    enName: "cs-biz-08-jx-mu02",
                  },
                  {
                    name: "bcs-biz-03-jx-mu02-yt",
                    type: "cluster",
                    enName: "bcs-biz-03-jx-mu02-yt",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
