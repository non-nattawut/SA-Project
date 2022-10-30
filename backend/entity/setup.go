package entity

import (
	"time"

	"gorm.io/gorm"

	"gorm.io/driver/sqlite"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("Patient-Management-System.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema

	database.AutoMigrate(
		&Department{},
		&Position{},
		&BloodGroups{},
		&Gender{},
		&Employee{},

		&Patient_Rights{},
		&Patient{},

		&Disease{},
		&Diagnostic_Type{},
		&Diagnostic{},

		&Medicine{},
		&Dispensation{},
		&Dispensation_Medicine{},

		&Appointment{},

		&Payment_type{},
		&Bill{},
	)

	db = database

	//Department
	D1 := Department{
		Department_Name: "IT(ฝ่ายไอที)",
	}
	db.Model(&Department{}).Create(&D1)

	D2 := Department{
		Department_Name: "MED(อายุรกรรม)",
	}
	db.Model(&Department{}).Create(&D2)

	D3 := Department{
		Department_Name: "ER(ห้องอุบัติเหตุ)",
	}
	db.Model(&Department{}).Create(&D3)

	D4 := Department{
		Department_Name: "ORTHO(กระดูก)",
	}
	db.Model(&Department{}).Create(&D4)

	D5 := Department{
		Department_Name: "OB-GYN(สูติ-นรีเวชกรรม)",
	}
	db.Model(&Department{}).Create(&D5)

	D6 := Department{
		Department_Name: "ENT(ตา หู ลำคอ)",
	}
	db.Model(&Department{}).Create(&D6)

	D7 := Department{
		Department_Name: "Finance(ฝ่ายการเงิน)",
	}
	db.Model(&Department{}).Create(&D7)
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//Position
	po1 := Position{
		Position_Name: "Doctor",
	}
	db.Model(&Position{}).Create(&po1)

	po2 := Position{
		Position_Name: "Nurse",
	}
	db.Model(&Position{}).Create(&po2)

	po3 := Position{
		Position_Name: "Cashier",
	}
	db.Model(&Position{}).Create(&po3)

	po4 := Position{
		Position_Name: "Admin",
	}
	db.Model(&Position{}).Create(&po4)
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//BG
	BG1 := BloodGroups{
		Blood_Groups_Name: "A RH+",
	}
	db.Model(&BloodGroups{}).Create(&BG1)

	BG2 := BloodGroups{
		Blood_Groups_Name: "A RH+",
	}
	db.Model(&BloodGroups{}).Create(&BG2)

	BG3 := BloodGroups{
		Blood_Groups_Name: "B RH+",
	}
	db.Model(&BloodGroups{}).Create(&BG3)

	BG4 := BloodGroups{
		Blood_Groups_Name: "B RH-",
	}
	db.Model(&BloodGroups{}).Create(&BG4)

	BG5 := BloodGroups{
		Blood_Groups_Name: "AB RH+",
	}
	db.Model(&BloodGroups{}).Create(&BG5)

	BG6 := BloodGroups{
		Blood_Groups_Name: "AB RH-",
	}
	db.Model(&BloodGroups{}).Create(&BG6)

	BG7 := BloodGroups{
		Blood_Groups_Name: "O RH+",
	}
	db.Model(&BloodGroups{}).Create(&BG7)

	BG8 := BloodGroups{
		Blood_Groups_Name: "O RH-",
	}
	db.Model(&BloodGroups{}).Create(&BG8)
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//Gender
	male := Gender{
		Gender_Name: "Male",
	}
	db.Model(&Gender{}).Create(&male)

	female := Gender{
		Gender_Name: "Female",
	}
	db.Model(&Gender{}).Create(&female)
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//Patient_Rights

	G := Patient_Rights{
		Right_Name: "บัตรทอง",
	}
	db.Model(&Patient_Rights{}).Create(&G)

	P := Patient_Rights{
		Right_Name: "ประกันสังคม",
	}
	db.Model(&Patient_Rights{}).Create(&P)
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Diagnostic_Type
	DT1 := Diagnostic_Type{
		DT_Name: "Basic",
	}
	db.Model(&Diagnostic_Type{}).Create(&DT1)

	DT2 := Diagnostic_Type{
		DT_Name: "Advanced",
	}
	db.Model(&Diagnostic_Type{}).Create(&DT2)
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Disease
	DS1 := Disease{
		Disease_Name: "Covid-19",
	}
	DS2 := Disease{
		Disease_Name: "Insomnia",
	}
	DS3 := Disease{
		Disease_Name: "ไช้หวัด",
	}
	DS4 := Disease{
		Disease_Name: "ไข้หวัดใหญ่",
	}
	DS5 := Disease{
		Disease_Name: "ไข้เลือดออก",
	}
	db.Model(&Disease{}).Create(&DS1)
	db.Model(&Disease{}).Create(&DS2)
	db.Model(&Disease{}).Create(&DS3)
	db.Model(&Disease{}).Create(&DS4)
	db.Model(&Disease{}).Create(&DS5)
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// PaymentType
	P_1 := Payment_type{
		Type: "เงินสด",
	}
	db.Model(&Payment_type{}).Create(&P_1)

	P_2 := Payment_type{
		Type: "พร้อมเพย์",
	}
	db.Model(&Payment_type{}).Create(&P_2)
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Medicine
	M11 := Medicine{
		Medicine_Name:  "ยาแก้ไอ Mucosolvan (ชนิดเม็ด)",
		Medicine_Price: 8,
		Medicine_Unit:  "1 tablet",
	}
	M12 := Medicine{
		Medicine_Name:  "ยาแก้ไอ ตราเสือดาว (ชนิดน้ำ)",
		Medicine_Price: 35,
		Medicine_Unit:  "120 ml",
	}
	M21 := Medicine{
		Medicine_Name:  "ยาแก้ปวด พาราเซตามอล (ชนิดเม็ด)",
		Medicine_Price: 1,
		Medicine_Unit:  "1 tablet",
	}
	M22 := Medicine{
		Medicine_Name:  "ยาแก้ปวด ซาร่า (ชนิดน้ำ)",
		Medicine_Price: 45,
		Medicine_Unit:  "60 ml",
	}
	M31 := Medicine{
		Medicine_Name:  "ยาธาตุน้ำขาว ตรากระต่ายบิน (ชนิดน้ำ)",
		Medicine_Price: 60,
		Medicine_Unit:  "200 ml",
	}
	db.Model(&Medicine{}).Create(&M11)
	db.Model(&Medicine{}).Create(&M12)
	db.Model(&Medicine{}).Create(&M21)
	db.Model(&Medicine{}).Create(&M22)
	db.Model(&Medicine{}).Create(&M31)
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Employee
	E1 := Employee{
		Personal_ID: "0000000000001",
		First_Name:  "ณัฐวุฒิ",
		Last_Name:   "รอดทอง",
		Password:    "$2a$12$T1UMkc8oWw4HdgeOYmGhfOyvPHG.ELvd9VCcYk9sdfeJ2eW2oUTiK",
		Gender:      male,
		BloodGroups: BG1,
		Department:  D2,
		Position:    po1,
	}
	E2 := Employee{
		Personal_ID: "0000000000002",
		First_Name:  "ธนัญญา",
		Last_Name:   "หวังผล",
		Password:    "$2a$12$T1UMkc8oWw4HdgeOYmGhfOyvPHG.ELvd9VCcYk9sdfeJ2eW2oUTiK",
		Gender:      female,
		BloodGroups: BG5,
		Department:  D2,
		Position:    po2,
	}
	E3 := Employee{
		Personal_ID: "0000000000003",
		First_Name:  "ทวีชัย",
		Last_Name:   "โพธิ์ดี",
		Password:    "$2a$12$T1UMkc8oWw4HdgeOYmGhfOyvPHG.ELvd9VCcYk9sdfeJ2eW2oUTiK",
		Gender:      male,
		BloodGroups: BG3,
		Department:  D7,
		Position:    po3,
	}
	E4 := Employee{
		Personal_ID: "0000000000004",
		First_Name:  "พรณภา",
		Last_Name:   "แสนต่างใจ",
		Password:    "$2a$12$T1UMkc8oWw4HdgeOYmGhfOyvPHG.ELvd9VCcYk9sdfeJ2eW2oUTiK",
		Gender:      female,
		BloodGroups: BG6,
		Department:  D1,
		Position:    po4,
	}
	db.Model(&Employee{}).Create(&E1)
	db.Model(&Employee{}).Create(&E2)
	db.Model(&Employee{}).Create(&E3)
	db.Model(&Employee{}).Create(&E4)
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Patient
	P1 := Patient{
		Patient_Personal_ID: "1319800334497",
		Employee:            E2,
		Patient_Firstname:   "โทนี่",
		Patient_Lastname:    "รากแก่น",
		Patient_Rights:      G,
		BloodGroups:         BG5,
		Gender:              female,
	}
	P2 := Patient{
		Patient_Personal_ID: "1234567890123",
		Employee:            E2,
		Patient_Firstname:   "ชัชชาติ",
		Patient_Lastname:    "สิทธิพันธุ์",
		Patient_Rights:      G,
		BloodGroups:         BG7,
		Gender:              male,
	}
	P3 := Patient{
		Patient_Personal_ID: "0987654321123",
		Employee:            E2,
		Patient_Firstname:   "พชรพล",
		Patient_Lastname:    "วรสุนทร",
		Patient_Rights:      P,
		BloodGroups:         BG1,
		Gender:              male,
	}
	db.Model(&Patient{}).Create(&P1)
	db.Model(&Patient{}).Create(&P2)
	db.Model(&Patient{}).Create(&P3)

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Diagnostic
	Dag1 := Diagnostic{
		Employee:        E1,
		Symptom:         "ไอ เจ็บคอ ไม่มีน้ำมูก",
		Diagnostic_Type: DT1,
		Disease:         DS3,
		Patient:         P1,
	}
	db.Model(&Diagnostic{}).Create(&Dag1)
	Dag2 := Diagnostic{
		Employee:        E1,
		Symptom:         "จมูกหัก",
		Diagnostic_Type: DT2,
		Disease:         DS5,
		Patient:         P2,
	}
	db.Model(&Diagnostic{}).Create(&Dag2)

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Diagnostic
	Dis1 := Dispensation{
		Patient:  P1,
		Employee: E1,
	}
	db.Model(&Dispensation{}).Create(&Dis1)
	Dis2 := Dispensation{
		Patient:  P2,
		Employee: E1,
	}
	db.Model(&Dispensation{}).Create(&Dis2)

	// Diagnostic
	DisMed1 := Dispensation_Medicine{
		Dispensation:    Dis1,
		Medicine:        M11,
		Medicine_Amount: 10,
		Time_Stamp:      time.Date(2022, 10, 23, 12, 30, 00, 00, time.Now().Local().Location()),
	}
	db.Model(&Dispensation_Medicine{}).Create(&DisMed1)
	DisMed2 := Dispensation_Medicine{
		Dispensation:    Dis1,
		Medicine:        M12,
		Medicine_Amount: 1,
		Time_Stamp:      time.Date(2022, 10, 23, 12, 30, 00, 00, time.Now().Local().Location()),
	}
	db.Model(&Dispensation_Medicine{}).Create(&DisMed2)
	DisMed3 := Dispensation_Medicine{
		Dispensation:    Dis2,
		Medicine:        M11,
		Medicine_Amount: 10,
		Time_Stamp:      time.Date(2022, 10, 23, 12, 40, 00, 00, time.Now().Local().Location()),
	}
	db.Model(&Dispensation_Medicine{}).Create(&DisMed3)

}
