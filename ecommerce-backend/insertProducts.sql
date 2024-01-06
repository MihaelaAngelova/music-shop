DELETE FROM web_order_quantities;
DELETE FROM web_order;
DELETE FROM product;
DELETE FROM address;

INSERT INTO product ([name], description, price, product_type, quantity) VALUES ('Opeth T-shirt Heritage', 'Opeth T-shirt of the album Heritage.', 30, 0, 5);
INSERT INTO product ([name], description, price, product_type, quantity) VALUES ('Opeth mug Deliverance', 'Opeth mug of the album Deliverance.', 15, 1, 12);
INSERT INTO product ([name], description, price, product_type, quantity) VALUES ('Opeth CD Damnation', 'Opeth CD of the album Damnation.', 20, 2, 3);
