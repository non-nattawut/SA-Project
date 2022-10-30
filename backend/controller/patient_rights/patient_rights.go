package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/non-nattawut/patient-management-system/entity"
)

// GET /patientrights/:id
func GetPatientRights(c *gin.Context) {

	var patientrights entity.Patient_Rights

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM patients WHERE id = ?", id).Scan(&patientrights).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patientrights})
}

// GET /patientrights
func ListPatientRights(c *gin.Context) {
	var patientrights []entity.Patient_Rights

	if err := entity.DB().Raw("SELECT * FROM patient_rights").Scan(&patientrights).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patientrights})
}
