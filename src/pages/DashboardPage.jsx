import { useEffect } from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faFloppyDisk, faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Cleaning from "../assets/images/cleaningService.jpeg";
import Massage from "../assets/images/promoMassage.jpeg";
import Sauna from "../assets/images/sauna.jpeg";

const DashboardPage = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setHarga("");
    }
    const handleShow = () => setShow(true);

    //menggunakan hook useNavigate untuk mengatur navigasi
    const navigate = useNavigate();

    //mengambil data user dari localstorage
    const user = JSON.parse(localStorage.getItem("user"));

    //menghandle jika user belum login
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigate("/login");
        }
    }, [navigate]);
    
    //mengubah format tanggal
    const formatDate= (date) => {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        return new Date(date).toLocaleDateString("id-ID", options);
    };

    // inisialisasi untuk menyimpan layanan dari form inputan
    const [layanan, setLayanan] = useState({
        nama: "",
        jenis: "",
        harga: "",
        deskripsi: "",
    });

    // menghandle perubahan nilai pada input
    const handleChange = (e) => {
        const { id, value } = e.target;
        setLayanan({ ...layanan, [id]: value });
    };

    // simpan harga daftar layanan
    const [harga, setHarga] = useState("");

    // menghandle perubahan nilai pada input harga, serta agar harga layanan hanya bisa diinput dengan angka saja
    const handleChangeHarga = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) || value === '') {
            setHarga(value);
        }
    };

    // simpan list daftar layanan
    const [listLayanan, setListLayanan] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
      
        if (
            layanan.nama.trim() === "" ||
            layanan.jenis.trim() === "" ||
            harga.trim() === "" ||
            layanan.deskripsi.trim() === ""
        ) {
            toast.error("Semua form harus diisi!");
            return;
        } else {
            let jenisLayanan = "";
            switch (layanan.jenis) {
                case "Cleaning":
                    jenisLayanan = "Cleaning Service";
                    break;
                case "Massage":
                    jenisLayanan = "Promo Massage";
                    break;
                case "Sauna":
                    jenisLayanan = "Sauna";
                    break;
            }
            toast.success(`Berhasil Tambah Data Layanan ${jenisLayanan}`);

            const newLayanan = {
                id: Date.now(), 
                nama: layanan.nama,
                jenis: layanan.jenis,
                harga: harga,
                deskripsi: layanan.deskripsi,
            };
            setListLayanan([...listLayanan, newLayanan]);
        }
        setLayanan({
            nama: "",
            jenis: "",
            harga: "",
            deskripsi: "",
        });
        handleClose();
    };

    const [imgJenis] = useState({
        Cleaning: Cleaning,
        Massage: Massage,
        Sauna: Sauna,
    });

    const [editLayanan, setEditLayanan] = useState({
        id: "", 
        nama: "",
        jenis: "",
        harga: "",
        deskripsi: "",
    });

    const [showEditModal, setShowEditModal] = useState(false);

    const handleShowEditModal = (index) => {
        setEditLayanan(listLayanan[index]);
        setShowEditModal(true);
    };

    const handleEditSubmit = () => {
        if (
            editLayanan.nama.trim() === "" ||
            editLayanan.jenis.trim() === "" ||
            editLayanan.harga.trim() === "" ||
            editLayanan.deskripsi.trim() === ""
        ) {
          toast.error("Semua form harus diisi!");
          return;
        }
        if (!/^\d*$/.test(editLayanan.harga)) {
            toast.error("Harga harus berupa angka!");
            return;
        }
        let jenisLayanan = "";
        switch (editLayanan.jenis) {
            case "Cleaning":
                jenisLayanan = "Cleaning Service";
                break;
            case "Massage":
                jenisLayanan = "Promo Massage";
                break;
            case "Sauna":
                jenisLayanan = "Sauna";
                break;
        }
        const index = listLayanan.findIndex((k) => k.id === editLayanan.id);
        const updateListLayanan = [...listLayanan];
      
        updateListLayanan[index] = {
          nama: editLayanan.nama,
          jenis: editLayanan.jenis,
          harga: editLayanan.harga,
          deskripsi: editLayanan.deskripsi,
        };
        setListLayanan(updateListLayanan);
        setShowEditModal(false);
        toast.success(`Berhasil Update Data Layanan ${jenisLayanan} (Update)!`);
    };

    const handleDeleteLayanan = (index) => {
        const updateListLayanan = [...listLayanan];
        updateListLayanan.splice(index, 1);
        setListLayanan(updateListLayanan);

        let jenisLayanan = "";
        switch (editLayanan.jenis) {
            case "Cleaning":
                jenisLayanan = "Cleaning Service";
                break;
            case "Massage":
                jenisLayanan = "Promo Massage";
                break;
            case "Sauna":
                jenisLayanan = "Sauna";
                break;
        }
        toast.success(`Berhasil Update Data Layanan ${jenisLayanan} (Update)!`);
    };
    
    return (
        <Container className="mt-5">
            <h1 className="mb-3 border-bottom fw-bold">Dashboard</h1>
            <Row className="mb-4">
                <Col md={10}>
                    <Card className="h-100 justify-content-center">
                        <Card.Body>
                            <h4>Selamat datang,</h4>
                            <h1 className="fw-bold display-6 mb-3">{user?.username}</h1>
                            <p className="mb-0">Kamu sudah login sejak:</p>
                            <p className="fw-bold lead mb-0">{formatDate(user?.loginAt)}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card>
                        <Card.Body>
                            <p>Bukti sedang ngantor:</p>
                            <img src="https://via.placeholder.com/150" className="img-fluid rounded" alt="Tidak Ada Gambar" />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <h1 className="mb-3 border-bottom fw-bold">Daftar Layanan</h1>
            <p className="mb-0">Grand Atma memiliki <strong>{listLayanan.length}</strong> daftar layanan yang dapat digunakan customer.</p>
            <p className="mb-4"></p> {/* Ini adalah space kosong */}
            <Button className="btn-success" onClick={handleShow}>
                <FontAwesomeIcon icon={faSquarePlus}/> Tambah Layanan
            </Button>

            <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Layanan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="nama">
                            <Form.Label>Nama Layanan</Form.Label>
                            <Form.Control
                            type="text"
                            value={layanan.nama}
                            onChange={(e) => handleChange(e)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="jenis">
                            <Form.Label>Jenis Layanan</Form.Label>
                            <Form.Select
                                aria-label="Default select"
                                value={layanan.jenis}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Pilih Layanan</option>
                                <option value="Cleaning">Cleaning Service</option>
                                <option value="Massage">Promo Massage</option>
                                <option value="Sauna">Sauna</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="harga">
                            <Form.Label>Harga Layanan</Form.Label>
                            <Form.Control
                                type="text"
                                value={harga}
                                onChange={handleChangeHarga}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="deskripsi">
                            <Form.Label>Deskripsi Layanan</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={layanan.deskripsi}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faFloppyDisk} /> Simpan
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row className="mt-4">
                <Col>
                {listLayanan.map((layanan, index) => (
                    <Col key={index} md={4} className="mb-3">
                        <Card className="cardLayout" style={{ width: 1300 }}>
                            <Card.Body>
                                <Row>
                                    <Col md={3}>
                                    <img
                                        src={imgJenis[layanan.jenis]}
                                        alt={`Gambar ${layanan.jenis}`}
                                        style={{
                                            width: 300,
                                            height: 200,
                                            objectFit: "cover",
                                            borderRadius: 10,
                                        }}
                                    />
                                    </Col>
                                    <Col md={8}>
                                        <Card.Header>
                                            <div className="card-info">
                                                <h3>{layanan.nama}</h3>
                                                <Card.Subtitle className="mb-2 text-muted">
                                                    {layanan.deskripsi}
                                                </Card.Subtitle>
                                            </div>
                                        </Card.Header>
                                        <div className="card-info">{" "}
                                            <Card.Text>
                                                Jenis Layanan: <strong>{layanan.jenis}</strong> Harga:{" "}
                                                <strong>Rp {layanan.harga}</strong>
                                            </Card.Text>
                                            <Row>
                                                <Col>
                                                    <Button
                                                        className="btn-danger"
                                                        style={{ marginRight: 20 }}
                                                        onClick={() => handleDeleteLayanan(index)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashCan} /> Hapus Layanan     
                                                    </Button>
                                                    <Button
                                                        className="btn-bg-primary"
                                                        onClick={() => handleShowEditModal(index)}
                                                    >
                                                        <FontAwesomeIcon icon={faPenToSquare} /> Edit Layanan
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                </Col>
            </Row>

            <Modal
                show={showEditModal}
                size="lg"
                onHide={() => setShowEditModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Layanan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="nama">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                type="text"
                                value={editLayanan?.nama || ""}
                                onChange={(e) =>
                                    setEditLayanan({ ...editLayanan, nama: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="jenis">
                            <Form.Label>Jenis Layanan</Form.Label>
                            <Form.Control
                                as="select"
                                value={editLayanan?.jenis || ""}
                                onChange={(e) =>
                                    setEditLayanan({ ...editLayanan, jenis: e.target.value })
                                }
                            >
                                <option value="" disabled>Pilih Layanan</option>
                                <option value="Cleaning">Cleaning Service</option>
                                <option value="Massage">Promo Massage</option>
                                <option value="Sauna">Sauna</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="harga">
                            <Form.Label>Harga Layanan</Form.Label>
                            <Form.Control
                                type="text"
                                value={editLayanan?.harga || ""}
                                onChange={(e) =>
                                    setEditLayanan({ ...editLayanan, harga: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="deskripsi">
                            <Form.Label>Deskripsi Layanan</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={editLayanan?.deskripsi || ""}
                                onChange={(e) =>
                                    setEditLayanan({ ...editLayanan, deskripsi: e.target.value })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={handleEditSubmit}>
                        <FontAwesomeIcon icon={faFloppyDisk} /> Simpan
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default DashboardPage;