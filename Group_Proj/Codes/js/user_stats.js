// Calculating age from date of birth
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function ShowUserFrequency() {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    if (users.length === 0) {
        document.querySelector(".stats-container").innerHTML = 
            "<h1>No Registered Users Found</h1><p class='text-center'>Please register a user to see statistics.</p>";
        return;
    }

    const totalUsers = users.length;
    document.getElementById("total-users").textContent = totalUsers;

    const genderCounts = users.reduce((acc, user) => {
        const gender = (user.gender || 'Unknown').toLowerCase(); 
        acc[gender] = (acc[gender] || 0) + 1;
        return acc;
    }, {});

    const ageGroupCounts = users.reduce((acc, user) => {
        if (!user.dob) return acc;

        const age = calculateAge(user.dob);
        let group;

        if (age >= 18 && age <= 25) {
            group = '18-25';
        } else if (age >= 26 && age <= 35) {
            group = '26-35';
        } else if (age >= 36 && age <= 50) {
            group = '36-50';
        } else if (age > 50) {
            group = '50+';
        } else {
            return acc; 
        }

        acc[group] = (acc[group] || 0) + 1;
        
        return acc;
    }, {});
    

    //Rendering bar charts
    function renderChart(containerId, counts, total) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        const sortedKeys = Object.keys(counts).sort();

        sortedKeys.forEach(key => {
            const count = counts[key];
            const percentage = (count / total) * 100;
            const label = key.charAt(0).toUpperCase() + key.slice(1); 

            const chartItem = document.createElement('div');
            chartItem.className = 'chart-item';
            
            chartItem.innerHTML = `
                <div class="chart-label">${label} (${count})</div>
                <div class="chart-bar-container">
                    <div class="chart-bar" style="width: ${percentage.toFixed(1)}%;"></div>
                </div>
                <div class="chart-value">${percentage.toFixed(1)}%</div>
            `;
            container.appendChild(chartItem);
        });
    }

    // Render both charts
    renderChart('gender-chart', genderCounts, totalUsers);
    renderChart('age-chart', ageGroupCounts, totalUsers);
}

document.addEventListener("DOMContentLoaded", ShowUserFrequency);