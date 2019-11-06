    const axios = require('axios');
    const cheerio = require('cheerio');

    const url = 'https://barrelhorseworld.com/events.asp';
    const events = []
    const details = {}

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
          const eventDetails = ''
     
        
          const detailUrl = `https://barrelhorseworld.com/${detailLink}`

        // const detailUrl =  'https://barrelhorseworld.com/eventdetail.asp?ID=126020'

          axios(detailUrl)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html)
                const detailsTable = $('tbody > tr')

                detailsTable.each(function() {
                    const details = {
                        description: '',
                        contact: '',
                        phone: ''
                    }

                    const rightColText = $(this).find('.text-right').text()
                    const siblings = $(this).find('.text-right').siblings().text()
                    // console.log('descriptor', rightColText, 'SIBLINGS', siblings)


                    if(rightColText === 'Description') {
                        // console.log('right col sibling', siblings)
                        details.description = siblings
                    }

                    if(rightColText === 'Contact') {
                        // console.log('right col sibling', siblings)
                        details.contact = siblings
                    }

                    // eventDetails = details 
                    
                    // console.log('DETAIL OBJ', eventDetails)
                    console.log('DETAILS', details)

                })
            })

          events.push({
            title: eventTitle,
            date: eventDate,
            location: eventLocation,
            link: detailUrl
          });
        });

        // console.log(events);
      })
      .catch(console.error);