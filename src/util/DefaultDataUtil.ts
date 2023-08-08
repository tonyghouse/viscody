export const defaultJson: string = "{\r\n  \"squadName\": \"Super hero squad\",\r\n  \"homeTown\": \"Metro City\",\r\n  \"formed\": 2016,\r\n  \"secretBase\": \"Super tower\",\r\n  \"active\": true,\r\n  \"members\": [\r\n    {\r\n      \"name\": \"Molecule Man\",\r\n      \"age\": 29,\r\n      \"secretIdentity\": \"Dan Jukes\",\r\n      \"powers\": [\"Radiation resistance\", \"Turning tiny\", \"Radiation blast\"]\r\n    },\r\n    {\r\n      \"name\": \"Madame Uppercut\",\r\n      \"age\": 39,\r\n      \"secretIdentity\": \"Jane Wilson\",\r\n      \"powers\": [\r\n        \"Million tonne punch\",\r\n        \"Damage resistance\",\r\n        \"Superhuman reflexes\"\r\n      ]\r\n    },\r\n    {\r\n      \"name\": \"Eternal Flame\",\r\n      \"age\": 1000000,\r\n      \"secretIdentity\": \"Unknown\",\r\n      \"powers\": [\r\n        \"Immortality\",\r\n        \"Heat Immunity\",\r\n        \"Inferno\",\r\n        \"Teleportation\",\r\n        \"Interdimensional travel\"\r\n      ]\r\n    }\r\n  ]\r\n}\r\n";

export const defaultYaml: string = "---\r\nsquadName: YAML SUPER hero squad\r\nhomeTown: Metro City\r\nformed: 2016\r\nsecretBase: Super tower\r\nactive: true\r\nmembers:\r\n- name: Molecule Man\r\n  age: 29\r\n  secretIdentity: Dan Jukes\r\n  powers:\r\n  - Radiation resistance\r\n  - Turning tiny\r\n  - Radiation blast\r\n- name: Madame Uppercut\r\n  age: 39\r\n  secretIdentity: Jane Wilson\r\n  powers:\r\n  - Million tonne punch\r\n  - Damage resistance\r\n  - Superhuman reflexes\r\n- name: Eternal Flame\r\n  age: 1000000\r\n  secretIdentity: Unknown\r\n  powers:\r\n  - Immortality\r\n  - Heat Immunity\r\n  - Inferno\r\n  - Teleportation\r\n  - Interdimensional travel";


export const defaultToml: string = "TOML";


export const defaultXml: string = "XML";


export const defaultCSV: string= "Name,Age,Salary";

export const defaultDataMap = {
    json: defaultJson,
    yaml: defaultYaml,
    toml: defaultToml,
    xml: defaultXml,
    csv: defaultCSV,
  };