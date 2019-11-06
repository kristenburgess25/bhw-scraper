    const axios = require('axios');
    const cheerio = require('cheerio');

    const url = 'https://barrelhorseworld.com/events.asp';
    const events = []
    const fullData = []

    axios(url)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html)
        const eventsTable = $('tbody > tr');
        
        eventsTable.each(function () {
        
          const rowData = $(this).find('td');
          const Info = rowData.text()
          const eventTitle = $(rowData).find('a').text()
          const detailLink = $(rowData).find('a').attr('href')
          const eventDate = $(rowData).first().text()
          const eventLocation = $(rowData).last().text()

          const detailUrl = `https://barrelhorseworld.com/${detailLink}`

          const event = {
            title: eventTitle,
            date: eventDate,
            location: eventLocation,
            link: detailUrl
          }
          getDetails(event);
        });
      })
      .catch(console.error);


    // fetching the details 

    function getDetails(event) {
        axios(event.link)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html)
            const detailsTable = $('tbody > tr')
            const details = {
                description: '',
                contact: '',
            }
  
            detailsTable.each(function() {
                const baseEvent = event 
  
                const rightColText = $(this).find('.text-right').text()
                const siblings = $(this).find('.text-right').siblings().text()
  
  
                if(rightColText === 'Description') {
                    details.description = siblings
                }
  
                if(rightColText === 'Contact') {
                    details.contact = siblings
                }
            })
            const mergedData = {...event, ...details}
            events.push(mergedData)
        })
        .catch(console.log('hit the catch'));
    }