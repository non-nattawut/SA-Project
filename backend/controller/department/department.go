package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/non-nattawut/patient-management-system/entity"
)

// GET /Department/:id
func ListDepartment(c *gin.Context) {
	var department []entity.Department
	if err := entity.DB().Raw("SELECT * FROM departments").Scan(&department).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": department})
}
