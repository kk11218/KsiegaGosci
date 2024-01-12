import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
import Persons from "../models/PersonsModel.js";
import Template from "../models/TemplateModel.js";
import Payments from "../models/PaymentsModel.js";
import {Op} from "sequelize";

//pobieranie z bazy wszystkie produkty wtedy gdy rola = admin, w przeciwnym razie pobierane są produkty tylko dla odpowiedniego użytkownika

export const getProducts = async (req, res) => {
    try {
        let response;
         {
            response = await Products.findAll({
                attributes: ['uuid'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }, {
                    model: Persons,
                    attributes: ['bride_name', 'groom_name', 'wedding_date'],
                    required: true
                }, {
                    model: Template,
                    attributes: ['title'],
                    required: true
                }],
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}



export const getProductById = async(req, res) => {
    try {
        const product = await Products.findOne({
            
            where: {
                uuid: req.params.id
            },
            include: [{
                model: Persons,
                attributes: ['bride_name', 'last_name_bride', 'groom_name', 'last_name_groom', 'wedding_date']
            }]
        });

        if (!product) return res.status(404).json({msg: "Data tidak ditemukan"});

        const response = {
            bride_name: product.person.bride_name,
            last_name_bride: product.person.last_name_bride,
            groom_name: product.person.groom_name,
            last_name_groom: product.person.last_name_groom,
            wedding_date: product.person.wedding_date,
            id: product.id,
            pin: product.pin,
            kod_qr: product.kod_qr,
            qr_personal_page: product.qr_personal_page,
            id_template: product.id_template,
            book_activity: product.book_activity
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}



export const createProduct = async (req, res) => {
    const { persons, template, kod_qr, qr_personal_page, pin, book_activity, paymentData } = req.body;
  
    try {
      // Create a new row in the Persons table
      const createdPerson = await Persons.create({
        last_name_bride: persons.last_name_bride,
        bride_name: persons.bride_name,
        last_name_groom: persons.last_name_groom,
        groom_name: persons.groom_name,
        wedding_date: persons.wedding_date,
      });
  
      // Use the generated ID from createdPerson to create a new row in the Products table
      const createdProduct = await Products.create({
        userId: req.userId,
        id_persons: createdPerson.id,
        id_template: template,
        kod_qr: kod_qr,
        qr_personal_page: qr_personal_page,
        pin: pin,
        book_activity: book_activity,
      });

      const createdPayment = await Payments.create({
        address: paymentData.address,
        sum_product: paymentData.sum_product,
        company_name: paymentData.company_name,
        nip: paymentData.nip,
        id_user: req.userId,
        id_basket_products: createdProduct.id,
        payment_type: paymentData.payment_type,
      });
  
      res.status(201).json({ msg: 'Product Created Successfully', createdProduct, createdPayment });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

export const updateProduct = async (req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            },
            include: [{
                model: Persons,
                attributes: ['id', 'last_name_bride', 'bride_name', 'last_name_groom', 'groom_name', 'wedding_date']
            }]
        });

        if (!product) {
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        const { last_name_bride, bride_name, last_name_groom, groom_name, wedding_date } = req.body;
        const person = product.person;

        if (person) {
            if (last_name_bride !== undefined) person.last_name_bride = last_name_bride;
            if (bride_name !== undefined) person.bride_name = bride_name;
            if (last_name_groom !== undefined) person.last_name_groom = last_name_groom;
            if (groom_name !== undefined) person.groom_name = groom_name;
            if (wedding_date !== undefined) person.wedding_date = wedding_date;

            await person.save();
        }

           
           const { name, kod_qr, qr_personal_page, pin, book_activity, date_of_purchase } = req.body;

           if (name !== undefined) {
               await Products.update({ name }, { where: { uuid: req.params.id } });
           }
   
           if (kod_qr !== undefined) {
               await Products.update({ kod_qr }, { where: { uuid: req.params.id } });
           }
           if (qr_personal_page !== undefined) {
            await Products.update({ qr_personal_page }, { where: { uuid: req.params.id } });
        }
   
           if (pin !== undefined) {
               await Products.update({ pin }, { where: { uuid: req.params.id } });
           }
   
           if (book_activity !== undefined) {
               await Products.update({ book_activity }, { where: { uuid: req.params.id } });
           }
   
           if (date_of_purchase !== undefined) {
               await Products.update({ date_of_purchase }, { where: { uuid: req.params.id } });
           }
   
           res.status(200).json({ msg: "Product updated successfully" });
       } catch (error) {
           console.error(error);
           res.status(500).json({ msg: error.message });
       }
   };





export const deleteProduct = async(req, res) =>{
    try {
        const product = await Product.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name} = req.body;
        if(req.role === "admin"){
            await Product.destroy({
                where:{
                    id: product.id
                }
            });
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Product.destroy({
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Product deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}