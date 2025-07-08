import csv
from faker import Faker
import random

fake = Faker()

categories = ['Smartphones', 'Laptops', 'Books', 'Textiles', 'Headphones']

with open('data/mock_products.csv', 'w', newline='', encoding='utf-8') as csvfile:
    fieldnames = ['name', 'description', 'category', 'price', 'stock', 'image_url']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    for _ in range(100):
        category = random.choice(categories)
        name = f"{fake.word().capitalize()} {category[:-1]}"
        description = fake.sentence(nb_words=12)
        price = round(random.uniform(10.0, 2000.0), 2)
        stock = random.randint(0, 50)
        image_url = fake.image_url(width=200, height=200)

        writer.writerow({
            'name': name,
            'description': description,
            'category': category,
            'price': price,
            'stock': stock,
            'image_url': image_url
        })

print("✅ 100 mock products generated in data/mock_products.csv")
