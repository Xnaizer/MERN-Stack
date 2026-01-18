import { faker } from "@faker-js/faker";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path"

type CategoryJSON = {
    name: string;
    description: string;
    icon: string;
}

const url = "https://res.cloudinary.com/dsurpllxe/image/upload/v1768732131/bvkchvcbfoc7cqlqht80.png";

const main = async () => {
    const items: CategoryJSON[] = [];
    const used = new Set<string>();

    while(items.length < 100) {
        const base = faker.commerce.department().toLowerCase();
        const suffix = faker.string.alphanumeric({ length: 6}).toLowerCase();
        const name = `category ${base} ${suffix}`;

        if(used.has(name)) continue;
        used.add(name);

        items.push({
            name,
            description: faker.commerce.productDescription(),
            icon: url
        })
    }

    const outDir = path.join(process.cwd(), "data");
    await mkdir(outDir, { recursive: true});

    await writeFile(
        path.join(outDir, "categories.json"),
        JSON.stringify(items, null, 2),
        "utf-8"
    )
}

main();