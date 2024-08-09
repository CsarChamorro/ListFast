document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('healthForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const age = document.getElementById('age').value;
        const height = document.getElementById('height').value;
        const weight = document.getElementById('weight').value;
        const gender = document.getElementById('gender').value;
        const activity = document.getElementById('activity').value;

        const weightKg = weight * 0.453592; // Convertir libras a kilogramos

        let bmr;
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weightKg) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weightKg) + (3.098 * height) - (4.330 * age);
        }

        let calories;
        switch (activity) {
            case 'sedentary':
                calories = bmr * 1.2;
                break;
            case 'light':
                calories = bmr * 1.375;
                break;
            case 'moderate':
                calories = bmr * 1.55;
                break;
            case 'active':
                calories = bmr * 1.725;
                break;
            case 'very_active':
                calories = bmr * 1.9;
                break;
        }

        const idealWeightMinKg = 18.5 * (height / 100) ** 2;
        const idealWeightMaxKg = 24.9 * (height / 100) ** 2;
        const idealWeightMinLbs = idealWeightMinKg / 0.453592;
        const idealWeightMaxLbs = idealWeightMaxKg / 0.453592;

        const bmi = weightKg / ((height / 100) ** 2);
        let bmiCategory;
        if (bmi < 18.5) {
            bmiCategory = "Bajo peso";
        } else if (bmi < 24.9) {
            bmiCategory = "Peso normal";
        } else if (bmi < 29.9) {
            bmiCategory = "Sobrepeso";
        } else {
            bmiCategory = "Obesidad";
        }

        const protein = (weightKg * 0.8).toFixed(1);
        const carbs = ((calories * 0.55) / 4).toFixed(1);
        const fats = ((calories * 0.25) / 9).toFixed(1);

        const waterIntake = (weightKg * 0.033).toFixed(1);

        document.getElementById('results').innerHTML = `
            <h3>Resultados:</h3>
            <p>Tu peso ideal debería estar entre <strong>${idealWeightMinLbs.toFixed(2)} lbs</strong> y <strong>${idealWeightMaxLbs.toFixed(2)} lbs</strong>.</p>
            <p>Para mantener tu peso, deberías consumir aproximadamente <strong>${calories.toFixed(0)} calorías</strong> al día.</p>
            <p>Tu IMC es <strong>${bmi.toFixed(1)}</strong>, lo cual se considera <strong>${bmiCategory}</strong>.</p>
            <p>Deberías consumir aproximadamente <strong>${protein} gramos</strong> de proteínas, <strong>${carbs} gramos</strong> de carbohidratos, y <strong>${fats} gramos</strong> de grasas diariamente.</p>
            <p>Deberías beber al menos <strong>${waterIntake} litros</strong> de agua al día.</p>
        `;
    });
});
