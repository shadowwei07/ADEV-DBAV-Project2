
SELECT * FROM vending_machine.payment_method;
SELECT * FROM vending_machine.status;
SELECT * FROM vending_machine.vending_payment;
SELECT * FROM vending_machine.vending_machine;
SELECT * FROM vending_machine.location;
SELECT * FROM vending_machine.item;
SELECT * FROM vending_machine.vending_item;
SELECT * FROM vending_machine.item_restock;


-- Insert Data--
-- payment_method table --
INSERT INTO vending_machine.payment_method VALUES(0, 'Cash');
INSERT INTO vending_machine.payment_method VALUES(0, 'Ez-link');
INSERT INTO vending_machine.payment_method VALUES(0, 'Credit & Debit Card');
INSERT INTO vending_machine.payment_method VALUES(0, 'NETS');

-- status Table --
INSERT INTO vending_machine.status VALUES(0, 'Available');
INSERT INTO vending_machine.status VALUES(0, 'Unavailable');

-- vending_payment table --
INSERT INTO vending_machine.vending_payment VALUES(0, 1, 1);
INSERT INTO vending_machine.vending_payment VALUES(0,'1','2');
INSERT INTO vending_machine.vending_payment VALUES(0, '1', '3');
INSERT INTO vending_machine.vending_payment VALUES(0, '1', '4');
INSERT INTO vending_machine.vending_payment VALUES(0, '2', '1');
INSERT INTO vending_machine.vending_payment VALUES(0, '2', '2');
INSERT INTO vending_machine.vending_payment VALUES(0, '2', '3');
INSERT INTO vending_machine.vending_payment VALUES(0, '2', '4');

-- vending_machine table --
INSERT INTO vending_machine.vending_machine VALUES(0, '1', 'Apac Vendings', '1');
INSERT INTO vending_machine.vending_machine VALUES(0, '2', 'Apac Vendings', '1');


-- location table --
INSERT INTO vending_machine.location VALUES(0, 'Informatics and IT', '3', '3');
INSERT INTO vending_machine.location VALUES(0, 'Engineering', '10', '1');

-- item table, vending_payment table -- ( Can use website)
-- 0, 'Pokka Ice Peach Tea', '1.50', '/images/pokkaicepeachtea.png', '1', '10'
-- 0, 'Pokka Ice Lemon Tea (Less Sugar)', '1.50', '/images/pokkaicelemontea.png', '1', '10'
-- 0, 'Pokka Kyoho Grape Juice Drink (Less Sugar)', '1.50', '/images/pokkakiyodrink.png', '1', '0'
-- 0, 'Pokka Green Tea', '1.50', '/images/pokkagreentea.png', '1', '8'
-- 0, '7Up Original Can Drink', '1.10', '/images/7upcan.png', '0', '0'
-- 0, '100 Plus Isotonic Can Drink', '1.10', '/images/100pluscan.png', '1', '10'
-- 0, 'Coco-Cola Original Taste Can Drink ', '1.10', '/images/cokeoriginaltaste.png', '0', '0'
-- 0, 'Coco-Cola Zero Sugar Can Drink', '1.10', '/images/cokezerosugarcan.png', '0', '0'
-- 0, 'Everest Plain Drinking Water', '0.90', '/images/everestwater.png', '1', '5'
-- 0, 'C&C Sparkling Lemon Can Drink', '1.70', '/images/c&clemoncan.png', '1', '3'
-- 0, 'MILO Original Can Drink', '1.40', '/images/milocan.png', '0', '0'
-- 0, 'Red Bull Gold Energy Drink', '1.50', '/images/redbullgoldcan.png', '0', '0'
-- 0, 'Wang Lao Ji Herbal Tea Can Drink', '1.10', '/images/wanglaojican.png', '1', '6'
-- 0, 'Nescafe Mocha Can Drink ', '1.30', '/images/nescafemochacan.png', '0', '0'
-- 0, 'Nescafe Original Milk Coffee Can Drink', '1.40', '/images/nescafeoriginalcan.png', '1', '1'
-- 0, 'Ice Cool Young Coconut Can Drink', '1.20', '/images/icecoolcoconutcan.png', '1', '3'

-- Special SQL Statement -- (JOIN)
SELECT vending_machine.vending_machine_id,vending_machine.location.block,vending_machine.location.floor,
GROUP_CONCAT(vending_machine.payment_method.payment_name SEPARATOR ',') AS payment_methods 
FROM vending_machine.vending_machine JOIN vending_machine.location ON vending_machine.location_id = vending_machine.location.location_id 
JOIN vending_machine.vending_payment ON vending_machine.vending_machine_id = vending_payment.vending_id JOIN vending_machine.payment_method 
ON vending_payment.payment_id = vending_machine.payment_method.payment_id 
GROUP BY vending_machine.vending_machine_id, vending_machine.location.block, vending_machine.location.floor;

SELECT vending_machine.vending_item.vending_machine_id,item.item_id,item.item_name,item.item_cost,item.item_image,item.availability,item.item_quantity 
FROM vending_machine.vending_item JOIN vending_machine.item ON vending_machine.item.item_id = vending_machine.vending_item.item_id 
WHERE VENDING_MACHINE_ID=1;

SELECT vending_machine.vending_item.vending_machine_id,item.item_id,item.item_name,item.item_cost,item.item_image,item.availability,item.item_quantity 
FROM vending_machine.vending_item JOIN vending_machine.item ON vending_machine.item.item_id = vending_machine.vending_item.item_id 
WHERE VENDING_MACHINE_ID=2;

SELECT vending_machine.item_restock.item_restock_id,vending_machine.item_restock.item_id,vending_machine.item.item_name, 
vending_machine.item.item_cost, vending_machine.item.item_image, vending_machine.item.availability, vending_machine.item.item_quantity 
FROM vending_machine.item_restock JOIN vending_machine.item ON vending_machine.item_restock.item_id = vending_machine.item.item_id;

SELECT vending_machine.item_restock.item_restock_id,
vending_machine.vending_item.vending_machine_id,vending_machine.item.item_id,
vending_machine.item.item_name, vending_machine.item.item_cost,
vending_machine.item.item_image,vending_machine.item.availability,
vending_machine.item.item_quantity,vending_machine.item_restock.restock_quantity
FROM vending_machine.item_restock 
JOIN vending_machine.item ON vending_machine.item_restock.item_id = vending_machine.item.item_id
JOIN vending_machine.vending_item ON vending_machine.item.item_id =vending_machine. vending_item.item_id
WHERE vending_machine.vending_item.vending_machine_id = 1;

SELECT vending_machine.item_restock.item_restock_id,
vending_machine.vending_item.vending_machine_id,vending_machine.item.item_id,
vending_machine.item.item_name, vending_machine.item.item_cost,
vending_machine.item.item_image,vending_machine.item.availability,
vending_machine.item.item_quantity, vending_machine.item_restock.restock_quantity
FROM vending_machine.item_restock 
JOIN vending_machine.item ON vending_machine.item_restock.item_id = vending_machine.item.item_id
JOIN vending_machine.vending_item ON vending_machine.item.item_id =vending_machine. vending_item.item_id
WHERE vending_machine.vending_item.vending_machine_id = 2;

SELECT vending_machine.vending_item.vending_machine_id,item.item_id,item.item_name,item.item_cost,item.item_image,item.availability,item.item_quantity 
FROM vending_machine.vending_item JOIN vending_machine.item ON vending_machine.item.item_id = vending_machine.vending_item.item_id 
WHERE vending_machine.vending_item.vending_machine_id=1 AND vending_machine.item.item_id = 13;

SELECT vending_machine.vending_item.vending_machine_id,item.item_id,item.item_name,item.item_cost,item.item_image,item.availability,item.item_quantity 
FROM vending_machine.vending_item JOIN vending_machine.item ON vending_machine.item.item_id = vending_machine.vending_item.item_id 
WHERE vending_machine.vending_item.vending_machine_id=2 AND vending_machine.item.item_id = 17;



-- Reset Auto Increment --
ALTER table vending_machine.payment_method auto_increment = 1;
ALTER table vending_machine.status auto_increment = 1;
ALTER table vending_machine.vending_payment auto_increment = 1;
ALTER table vending_machine.vending_machine auto_increment = 1;
ALTER table vending_machine.item auto_increment = 1;
ALTER table vending_machine.vending_item auto_increment = 1;
ALTER table vending_machine.location auto_increment = 1;
ALTER table vending_machine.item_restock auto_increment = 1;






