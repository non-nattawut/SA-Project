package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/non-nattawut/patient-management-system/entity"
)

// POST /diagnostictype
func CreateDiagnostic_Type(c *gin.Context) {
	var diagnostictype entity.Diagnostic_Type
	if err := c.ShouldBindJSON(&diagnostictype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&diagnostictype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": diagnostictype})
}

// GET /diagnostictype/:id
func GetDiagnostic_Type(c *gin.Context) {
	var diagnostictype entity.Diagnostic_Type
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM diagnostic_types WHERE id = ?", id).Scan(&diagnostictype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": diagnostictype})
}

// GET /diagnostictypes
func ListDiagnostic_Types(c *gin.Context) {
	var diagnostictypes []entity.Diagnostic_Type
	if err := entity.DB().Raw("SELECT * FROM diagnostic_types").Scan(&diagnostictypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": diagnostictypes})
}

// DELETE /diagnostictypes/:id
func DeleteDiagnostic_Type(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM diagnostic_types WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "diagnostictype not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /diagnostictypes
func UpdateDiagnostic_Type(c *gin.Context) {
	var diagnostictype entity.Diagnostic_Type
	if err := c.ShouldBindJSON(&diagnostictype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", diagnostictype.ID).First(&diagnostictype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "diagnostic_type not found"})
		return
	}

	if err := entity.DB().Save(&diagnostictype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": diagnostictype})
}
