DROP DATABASE IF EXISTS product_details

CREATE TABLE IF NOT EXISTS products (
  product_id INT PRIMARY KEY,
  name VARCHAR(40),
  slogan TEXT,
  description TEXT,
  category VARCHAR(25),
  default_price VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS styles (
  style_id integer PRIMARY KEY,
  product_id INT,
  name VARCHAR(40),
  sale_price VARCHAR(10),
  original_price VARCHAR(10),
  default_style boolean,
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS features (
  feature_id INT PRIMARY KEY,
  product_id INT,
  feature VARCHAR(50),
  feature_value VARCHAR(50),
  FOREIGN KEY(product_id) REFERENCES styles(product_id)
);

CREATE TABLE IF NOT EXISTS photos (
  photo_id INT PRIMARY KEY auto_increment,
  style_id INT,
  thumbnail_url TEXT,
  url TEXT,
  FOREIGN KEY(style_id) REFERENCES styles(style_id)
);

CREATE TABLE IF NOT EXISTS skus (
  sku_id INT PRIMARY KEY,
  style_id INT,
  size VARCHAR(3),
  quantity INT,
  FOREIGN KEY(style_id) REFERENCES styles(style_id)
);