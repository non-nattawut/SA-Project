package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/non-nattawut/patient-management-system/entity"
)

/* --- ระบบบันทึกข้อมูลคนไข้ ---*/
/* Patient */

// POST /patients
func CreatePatients(c *gin.Context) {

	var patients entity.Patient
	var bloodgroups entity.BloodGroups
	var patientrights entity.Patient_Rights
	var gender entity.Gender

	if err := c.ShouldBindJSON(&patients); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if patients.Patient_Personal_ID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patientPersonalID invalid"})
		return
	}

	if patients.Patient_Firstname == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "firstName invalid"})
		return
	}

	if patients.Patient_Lastname == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "lastName invalid"})
		return
	}

	// ค้นหา bloodGroups ด้วย id
	if tx := entity.DB().Where("id = ?", patients.BloodGroupsID).First(&bloodgroups); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bloodGroups not found"})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", patients.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	// ค้นหา patientrights ด้วย id
	if tx := entity.DB().Where("id = ?", patients.Patient_RightsID).First(&patientrights); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patientrights not found"})
		return
	}

	patient := entity.Patient{
		Patient_Personal_ID: patients.Patient_Personal_ID,
		Patient_Firstname:   patients.Patient_Firstname,
		Patient_Lastname:    patients.Patient_Lastname,
		BloodGroupsID:       patients.BloodGroupsID,
		Patient_RightsID:    patients.Patient_RightsID,
		Employee_ID:         patients.Employee_ID,
		GenderID:            patients.GenderID,
	}

	if _, err := govalidator.ValidateStruct(patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&patient).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patients})
}

// GET /patients/:id
func GetPatients(c *gin.Context) {

	var patients entity.Patient

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM patients WHERE id = ?", id).Scan(&patients).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patients})
}

/** START step 6 ดึงข้อมูลทั้งหมด() */ // ระบบสั่งจ่ายยา
// GET /patients
func ListPetients(c *gin.Context) {
	var patients []entity.Patient

	if err := entity.DB().Raw("SELECT * FROM patients").Scan(&patients).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patients})
}

/** END step 6 ดึงข้อมูลทั้งหมด() */ // ระบบสั่งจ่ายยา

func ListPetients_Table(c *gin.Context) {
	var patients []entity.Patient

	if err := entity.DB().Preload("Gender").Preload("BloodGroups").Preload("Patient_Rights").Raw("SELECT * FROM patients").Find(&patients).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patients})
}
