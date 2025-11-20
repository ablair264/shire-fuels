const { Resend } = require('resend')

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  // Check for Resend API key
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set')
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Email service not configured' })
    }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const enquiry = JSON.parse(event.body)

    // Validate required fields
    if (!enquiry.name || !enquiry.email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name and email are required' })
      }
    }

    // Build email content
    const serviceLabel = {
      'heating-oil': 'Heating Oil',
      'red-diesel': 'Red Diesel',
      'fuel-cards': 'Fuel Cards',
      'oil-tanks': 'Oil Tanks',
      'oils-lubricants': 'Oils & Lubricants',
      'other': 'Other'
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #264B8C 0%, #4D973C 100%);
              color: white;
              padding: 30px 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px 20px;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 15px;
              padding: 12px;
              background: white;
              border-left: 4px solid #4D973C;
              border-radius: 4px;
            }
            .label {
              font-weight: bold;
              color: #264B8C;
              display: block;
              margin-bottom: 5px;
            }
            .value {
              color: #333;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">New Enquiry from Shire Fuels Website</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span>
                <span class="value">${enquiry.name}</span>
              </div>

              <div class="field">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:${enquiry.email}">${enquiry.email}</a></span>
              </div>

              ${enquiry.phone ? `
              <div class="field">
                <span class="label">Phone:</span>
                <span class="value"><a href="tel:${enquiry.phone}">${enquiry.phone}</a></span>
              </div>
              ` : ''}

              ${enquiry.postcode ? `
              <div class="field">
                <span class="label">Postcode:</span>
                <span class="value">${enquiry.postcode}</span>
              </div>
              ` : ''}

              ${enquiry.service ? `
              <div class="field">
                <span class="label">Service Interested In:</span>
                <span class="value">${serviceLabel[enquiry.service] || enquiry.service}</span>
              </div>
              ` : ''}

              ${enquiry.notes ? `
              <div class="field">
                <span class="label">Additional Notes:</span>
                <span class="value">${enquiry.notes}</span>
              </div>
              ` : ''}

              <div class="field">
                <span class="label">Source:</span>
                <span class="value">${enquiry.source || 'Website'}</span>
              </div>

              <div class="field">
                <span class="label">Submitted:</span>
                <span class="value">${new Date().toLocaleString('en-GB', {
                  timeZone: 'Europe/London',
                  dateStyle: 'full',
                  timeStyle: 'short'
                })}</span>
              </div>
            </div>
            <div class="footer">
              <p>This enquiry was submitted via the Shire Fuels website contact form.</p>
              <p>Please respond within 24 hours for the best customer experience.</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Shire Fuels Website <info@shirefuels.co.uk>',
      to: ['info@shirefuels.co.uk', 'blair@hotmail.co.uk'],
      subject: `New Enquiry: ${enquiry.service ? serviceLabel[enquiry.service] : 'General'} - ${enquiry.name}`,
      html: emailHtml,
      replyTo: enquiry.email
    })

    if (error) {
      console.error('Resend error:', error)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send email' })
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully',
        id: data.id
      })
    }
  } catch (error) {
    console.error('Function error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    }
  }
}
