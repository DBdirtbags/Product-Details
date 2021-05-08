DROP DATABASE IF EXISTS product_details

CREATE DATABASE product_details

-- \c into database

CREATE TABLE IF NOT EXISTS products (
  product_id INT PRIMARY KEY,
  name VARCHAR(40),
  slogan TEXT,
  description TEXT,
  category VARCHAR(25),
  default_price VARCHAR(255)
);
CREATE INDEX product_id_index ON products (product_id);

CREATE TABLE IF NOT EXISTS styles (
  style_id INT PRIMARY KEY,
  product_id INT,
  name VARCHAR(255),
  sale_price VARCHAR(255),
  original_price VARCHAR(255),
  default_style boolean,
  FOREIGN KEY(product_id) REFERENCES products(product_id);
);
CREATE INDEX styles_id_index ON styles (product_id);

CREATE TABLE IF NOT EXISTS features (
  feature_id INT PRIMARY KEY,
  product_id INT,
  feature VARCHAR(50),
  feature_value VARCHAR(50),
  FOREIGN KEY(product_id) REFERENCES products(product_id);
);
CREATE INDEX features_id_index ON features (product_id);

CREATE TABLE IF NOT EXISTS photos (
  photo_id INT,
  style_id INT,
  thumbnail_url TEXT,
  url TEXT,
  FOREIGN KEY(style_id) REFERENCES styles(style_id)
);
CREATE INDEX photo_id_index ON photos (style_id);

CREATE TABLE IF NOT EXISTS skus (
  sku_id INT PRIMARY KEY,
  style_id INT,
  size VARCHAR(10),
  quantity INT,
  FOREIGN KEY(style_id) REFERENCES styles(style_id)
);
CREATE INDEX sku_id_index ON skus (style_id);

CREATE TABLE IF NOT EXISTS related_ids (
  id INT PRIMARY KEY,
  product_id INT,
  related_id INT,
  FOREIGN KEY(product_id) REFERENCES styles(style_id)
);
CREATE INDEX related_id_index ON related_ids (product_id);

-- SEED DB
\COPY products(product_id, name, slogan, description, category, default_price)
FROM '/Users/mattsalmons/Documents/Coding Projects/CO1611/SDC/SDC Data/product.csv'
DELIMITER ','
CSV HEADER;

\COPY styles(style_id, product_id, name, sale_price, original_price, default_style)
FROM '/Users/mattsalmons/Documents/Coding Projects/CO1611/SDC/SDC Data/styles.csv'
DELIMITER ','
CSV HEADER;

\COPY features(feature_id, product_id, feature, feature_value)
FROM '/Users/mattsalmons/Documents/Coding Projects/CO1611/SDC/SDC Data/features.csv'
DELIMITER ','
CSV HEADER;

\COPY photos(photo_id, style_id, thumbnail_url, url)
FROM '/Users/mattsalmons/Documents/Coding Projects/CO1611/SDC/SDC Data/photos.csv'
WITH (FORMAT CSV, HEADER);

\COPY skus(sku_id, style_id, size, quantity)
FROM '/Users/mattsalmons/Documents/Coding Projects/CO1611/SDC/SDC Data/skus.csv'
DELIMITER ','
CSV HEADER;

\COPY related_ids(id, product_id, related_id)
FROM '/Users/mattsalmons/Documents/Coding Projects/CO1611/SDC/SDC Data/related.csv'
DELIMITER ','
CSV HEADER;
