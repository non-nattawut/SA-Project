package entity

import (
	"gorm.io/gorm"

	"time"
)

// --- ระบบบันทึกข้อมูลบุคลากร
type Department struct {
	gorm.Model
	Department_Name string
	Employee        []Employee    `gorm:"foreignKey:DepartmentID"`
	Appointment     []Appointment `gorm:"foreignKey:DepartmentID"`
}

type Position struct {
	gorm.Model
	Position_Name string
	Employee      []Employee `gorm:"foreignKey:PositionID"`
}

type BloodGroups struct {
	gorm.Model
	Blood_Groups_Name string
	Employee          []Employee `gorm:"foreignKey:BloodGroupsID"`
	Patient           []Patient  `gorm:"foreignKey:BloodGroupsID"`
}

type Gender struct {
	gorm.Model
	Gender_Name string
	Employee    []Employee `gorm:"foreignKey:GenderID"`
	Patient     []Patient  `gorm:"foreignKey:GenderID"`
}

type Employee struct {
	gorm.Model
	Personal_ID   string
	First_Name    string
	Last_Name     string
	GenderID      *uint
	Gender        Gender `gorm:"references:id"`
	BloodGroupsID *uint
	BloodGroups   BloodGroups `gorm:"references:id"`
	DepartmentID  *uint
	Department    Department `gorm:"references:id"`
	PositionID    *uint
	Position      Position `gorm:"references:id"`
	Password      string
	Patient       []Patient      `gorm:"foreignKey:Employee_ID"`
	Diagnostic    []Diagnostic   `gorm:"foreignKey:Employee_ID"`
	Dispensation  []Dispensation `gorm:"foreignKey:Employee_ID"`
	Appointment   []Appointment  `gorm:"foreignKey:Employee_ID"`
	Bill          []Bill         `gorm:"foreignKey:Employee_ID"`
}

// --- ระบบประวัติผู้ป่วย

type Patient_Rights struct {
	gorm.Model
	Right_Name string
	Patient    []Patient `gorm:"foreignKey:Patient_RightsID"`
}

type Patient struct {
	gorm.Model
	Patient_Personal_ID string
	Employee_ID         *uint
	Employee            Employee `gorm:"references:id"`
	Patient_Firstname   string
	Patient_Lastname    string
	Patient_RightsID    *uint
	Patient_Rights      Patient_Rights `gorm:"references:id"`
	BloodGroupsID       *uint
	BloodGroups         BloodGroups `gorm:"references:id"`
	GenderID            *uint
	Gender              Gender         `gorm:"references:id"`
	Diagnostic          []Diagnostic   `gorm:"foreignKey:Patient_ID"`
	Dispensation        []Dispensation `gorm:"foreignKey:Patient_ID"`
	Appointment         []Appointment  `gorm:"foreignKey:Patient_ID"`
}

// --- ระบบวินิจฉัย

type Disease struct {
	gorm.Model
	Disease_Name string       `gorm:"uniqueIndex"`
	Diagnostic   []Diagnostic `gorm:"foreignKey:Disease_ID"`
}

type Diagnostic_Type struct {
	gorm.Model
	DT_Name    string       `gorm:"uniqueIndex"`
	Diagnostic []Diagnostic `gorm:"foreignKey:Diagnostic_TypeID"`
}

type Diagnostic struct {
	gorm.Model
	Employee_ID       *uint
	Employee          Employee `gorm:"references:id"`
	Symptom           string
	Diagnostic_TypeID *uint
	Diagnostic_Type   Diagnostic_Type `gorm:"references:id"`
	Disease_ID        *uint
	Disease           Disease `gorm:"references:id"`
	Patient_ID        *uint
	Patient           Patient `gorm:"references:id"`
	Bill              []Bill  `gorm:"foreignKey:Diagnostic_ID"`
}

// --- ระบบสั่งจ่ายยา

type Medicine struct {
	gorm.Model
	Medicine_Name         string
	Medicine_Price        uint
	Medicine_Unit         string
	Dispensation_Medicine []Dispensation_Medicine `gorm:"foreignKey:Medicine_ID"`
}

type Dispensation struct {
	gorm.Model
	Patient_ID            *uint
	Patient               Patient `gorm:"references:id"`
	Employee_ID           *uint
	Employee              Employee                `gorm:"references:id"`
	Dispensation_Medicine []Dispensation_Medicine `gorm:"foreignKey:Dispensation_ID"`
	Bill                  []Bill                  `gorm:"foreignKey:Dispensation_ID"`
}

type Dispensation_Medicine struct {
	gorm.Model
	Dispensation_ID *uint
	Dispensation    Dispensation `gorm:"references:id"`
	Medicine_ID     *uint
	Medicine        Medicine `gorm:"references:id"`
	Medicine_Amount uint
	Time_Stamp      time.Time
}

// --- ระบบใบนัด

type Appointment struct {
	gorm.Model
	Employee_ID  *uint
	Employee     Employee `gorm:"references:id"`
	Patient_ID   *uint
	Patient      Patient `gorm:"references:id"`
	App_Out      time.Time
	App_In       time.Time
	App_Note     string
	DepartmentID *uint
	Department   Department `gorm:"references:id"`
}

// --- ระบบออกบิลชำระค่าบริการ

type Payment_type struct {
	gorm.Model
	Type string
	Bill []Bill `gorm:"foreignKey:Payment_type_ID"`
}

type Bill struct {
	gorm.Model
	Diagnostic_ID   *uint
	Diagnostic      Diagnostic `gorm:"references:id"`
	Dispensation_ID *uint
	Dispensation    Dispensation `gorm:"references:id"`
	Employee_ID     *uint
	Employee        Employee `gorm:"references:id"`
	Payment_type_ID *uint
	Payment_type    Payment_type `gorm:"references:id"`
	Bill_Price      uint
	Time_Stamp      time.Time
}
