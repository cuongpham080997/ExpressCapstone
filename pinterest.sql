CREATE TABLE nguoi_dung (
    nguoi_dung_id INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(255) UNIQUE,
	mat_khau VARCHAR(255),
	ho_ten VARCHAR(255),
	tuoi INT,
	anh_dai_dien VARCHAR(255)
);

CREATE TABLE hinh_anh(
	hinh_id INT PRIMARY KEY AUTO_INCREMENT,
	ten_hinh VARCHAR(255),
	duong_dan VARCHAR(255),
	mo_ta VARCHAR(255),
	nguoi_dung_id INT,
	FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id) ON DELETE SET NULL
);


CREATE TABLE binh_luan(
	binh_luan_id INT PRIMARY KEY AUTO_INCREMENT,
	nguoi_dung_id INT,
	hinh_id INT,
	ngay_binh_luan DATE,
	noi_dung VARCHAR(255),
	FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id) ON DELETE SET NULL,
	FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id) ON DELETE CASCADE
);

CREATE TABLE luu_anh(
	nguoi_dung_id INT,
	hinh_id INT,
	ngay_luu DATE,
	PRIMARY KEY(nguoi_dung_id, hinh_id),
	FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id) ON DELETE CASCADE,
	FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id) ON DELETE CASCADE
);

INSERT INTO hinh_anh (hinh_id, ten_hinh, duong_dan, mo_ta, nguoi_dung_id)
	VALUES 
		(15, 'Hình 9', 'duong_dan/hinh9.jpg', 'Mô tả hình 9', 1),
		(16, 'Hình 2', 'duong_dan/hinh2.jpg', 'Mô tả hình 2', 2),
		(17, 'Hình 3', 'duong_dan/hinh3.jpg', 'Mô tả hình 3', 2),
		(18, 'Hình 4', 'duong_dan/hinh4.jpg', 'Mô tả hình 4', 1),
		(19, 'Hình 5', 'duong_dan/hinh5.jpg', 'Mô tả hình 5', 1),
		(20, 'Hình 8', 'duong_dan/hinh8.jpg', 'Mô tả hình 8', 1),
		(21, 'Hình 7', 'duong_dan/hinh7.jpg', 'Mô tả hình 7', 2),
		(26, 'Cybersoft', '1721836388700_bg.jpg', 'great!', 1),
		(27, 'Cybersoft 2', '1721836453669_bg.jpg', 'great anh wonderful', 5);

INSERT INTO binh_luan (binh_luan_id, nguoi_dung_id, hinh_id, ngay_binh_luan, noi_dung)
VALUES 
	(10, 2, 16, '2024-07-20', 'Bình luận số 2'),
	(11, 2, 16, '2024-07-19', 'Bình luận số 3'),
	(12, 1, 16, '2024-07-18', 'Bình luận số 4'),
	(13, 2, 19, '2024-07-17', 'Bình luận số 5');


INSERT INTO luu_anh (nguoi_dung_id, hinh_id, ngay_luu)
VALUES 
	(1, 16, '2024-07-20'),
	(1, 17, '2024-07-18'),
	(1, 20, '2024-07-23'),
	(2, 15, '2024-07-23'),
	(2, 17, '2024-07-19'),
	(2, 18, '2024-07-17'),
	(2, 21, '2024-07-16'),
	(5, 16, '2024-07-24');

INSERT INTO nguoi_dung (nguoi_dung_id, email, mat_khau, ho_ten, tuoi, anh_dai_dien) VALUES
	(1, 'test777@yvl.com', '$2b$10$cgddJLg1uHAzvpR3rndY3.NBJ9uXm46TW4vUePd1vJ.8dczkA2piG', 'cuong hi hi', 27, NULL),
	(2, 'nhan@gmail.com', '$2b$10$1HniYR1iqGNkhfv2fjxT..j3JVAX7R/Nu9b9JJBBOO7YhLfv5DFku', 'Nhan', 18, NULL),
	(5, 'node42123@gmail.com', '$2b$10$rxAmHKR0iYopUPqDX2OpDO4Gefq24JkOi4sR3ACP/6neA1Aq5RQzS', 'Node 42 thay Sang', 100, '1721836569487_moutain.jpg');












