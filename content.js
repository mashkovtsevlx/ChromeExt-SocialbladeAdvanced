// content.js

function getVideoStats(rows) {
    let totalVids = 0;
    let totalViews = 0;
    let totalComments = 0;
    const date3MonthAgo = new Date();
    date3MonthAgo.setMonth(date3MonthAgo.getMonth() - 3);

    for (const row of rows) {
        const date = new Date(row.children[0].innerText);
        if (date > date3MonthAgo) {
            totalVids++;
            totalViews += parseInt(row.children[2].innerText.replace("K", ""));
            totalComments += parseInt(row.children[4].innerText);
        }
    }

    const avgViews = (totalViews / totalVids).toFixed(2);
    const engagement = (totalComments / totalViews).toFixed(2);
    console.log(`$c[Socialblade Advanced] Average views (last 3 months): ${avgViews}K. Average engagement: ${engagement}`, 'color: blue; font-size: 16px;');
}

// Function to analyze the DOM
async function searchRows() {
    let rows = null;
    while (true) {
        rows = document.querySelectorAll(".RowRecentTable");
        if (rows.length > 0) {
            getVideoStats(rows);
            break;
        }

        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

searchRows();