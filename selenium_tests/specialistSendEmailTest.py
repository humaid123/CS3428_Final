# Isaac Cain A00391748
# Check that the specialist can send an email successfully, and read it in their sent items.

import time
from selenium.webdriver import Chrome

index_url = "http://ugdev.cs.smu.ca/~group7/index.html"
specialist_email = "SpecialistTest"
specialist_password = "testing"
student_email = "StudentTest"
cc_email = "LeliseSmith@yahoo.com"

driver = Chrome()
driver.get(index_url)
time.sleep(2)
driver.execute_script("javascript:changeToSpecialist()")
time.sleep(2)
driver.find_element_by_id('email').send_keys(specialist_email)
driver.find_element_by_id('password').send_keys(specialist_password)
driver.execute_script("javascript:LoginSpecialist()")
time.sleep(4)
alert = driver.switch_to.alert
alert.accept()
time.sleep(3)
# inbox
alert = driver.switch_to.alert
alert.accept()
time.sleep(3)
# test office button functionality
driver.execute_script("javascript:closeOfficeButtons()")
time.sleep(4)
driver.execute_script("javascript:showOffice()")
time.sleep(4)
# access compose
driver.execute_script("javascript:linkCompose()")
time.sleep(4)
driver.find_element_by_id('ToDropDown').send_keys(student_email)
driver.find_element_by_id('FromDropDown').send_keys(specialist_email)
driver.find_element_by_id('CcDropDown').send_keys(cc_email)
driver.find_element_by_id('SubjectTextBox').send_keys('Hopefully a success')
driver.find_element_by_id('BodyTextBox').send_keys(
    'This email was entirely composed and sent using Selenium on Python 3.8 by Isaac.')
driver.execute_script("javascript:sendAdminEmail()")
time.sleep(4)
alert = driver.switch_to.alert
alert.accept()
time.sleep(3)
# access sent emails
driver.execute_script("javascript:loadSentEmails()")
time.sleep(4)
driver.close()
