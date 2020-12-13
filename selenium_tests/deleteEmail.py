# Test to delete all emails in test1 inbox and testSpecialist1inbox
#Written by Caitlin Maillet
from selenium.webdriver import Chrome
import time

index_url = "http://ugdev.cs.smu.ca/~group7/index.html"
student_email = "test1"
specialist_email = "testSpecialist1"
password = "hi"

def deleteEmail(email, selection, system):
    driver = Chrome("chromedriver")
    driver.get(index_url)
    driver.find_element_by_id(selection).click()
    time.sleep(1)
    driver.find_element_by_id("email").send_keys(email)
    driver.find_element_by_id("password").send_keys(password)
    if (system is not None):
        driver.find_element_by_id(system).click()
    driver.find_element_by_id("signInButton").click()
    time.sleep(4)
    driver.switch_to.alert.accept()
    time.sleep(1)
    driver.switch_to.alert.accept()
    emailNum = driver.find_elements_by_class_name("deleteKey")
    for i in range(len(emailNum)):
        delete = driver.find_element_by_id("deleteKey0")
        delete.click()
        driver.switch_to.alert.accept()
        time.sleep(4)
        driver.switch_to.alert.accept()
    emailNum = driver.find_elements_by_class_name("deleteKey")
    if(len(emailNum)!=0):
        assert emailNum != 0, "Not all emails deleted"
    time.sleep(1)
    driver.close()

deleteEmail(student_email, "studentSelection", "Basic")
deleteEmail(specialist_email, "specialistSelection", None)