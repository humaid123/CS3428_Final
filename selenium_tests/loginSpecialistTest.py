
from selenium.webdriver import Chrome
import time

index_url = "http://ugdev.cs.smu.ca/~group7/index.html"
index_title = "Autism NS pre-login"
specialist_login_url = "http://ugdev.cs.smu.ca/~group7/specialistLogin.html"
specialist_login_title = "Specialist Login"


def goToAdminLoginFromIndex(driver):
    driver.get("http://ugdev.cs.smu.ca/~group7/index.html")
    assert driver.current_url == index_url, "wrong index url"
    assert driver.title == index_title, "wrong index title"
    driver.find_element_by_id("specialistSelection").click()
    assert driver.current_url == specialist_login_url, "wrong specialist login url"
    assert driver.title == specialist_login_title, "wrong specialist login title"


# login specialist
# correct credentials
correct_email = "testSpecialist1   "  # add some spaces to test trim()
correct_password = "hi"
successfull_connection_msg = "Successfully connected."
specialist_system_url = "http://ugdev.cs.smu.ca/~group7/Specialist/mainPage.html"
specialist_system_title = "Specialist Email System"
# code for correct credentials
driver = Chrome("chromedriver.exe")
goToAdminLoginFromIndex(driver)
driver.find_element_by_id("email").send_keys(correct_email)
driver.find_element_by_id("password").send_keys(correct_password)
driver.find_element_by_id("signInButton").click()
time.sleep(2)
alert = driver.switch_to.alert
assert alert.text == successfull_connection_msg, "wrong message for successfull connection"
alert.accept()
time.sleep(4)
alert = driver.switch_to.alert  # number of emails alert
alert.accept()
assert driver.current_url == specialist_system_url, "wrong specialist system url"
assert driver.title == specialist_system_title, "wrong specialist system title"
driver.close()

# wrong email
wrong_email = "hello"
wrong_credential_message = "Server said: Wrong username or password."
# code
driver = Chrome("chromedriver.exe")
goToAdminLoginFromIndex(driver)
driver.find_element_by_id("email").send_keys(wrong_email)
driver.find_element_by_id("password").send_keys(correct_password)
driver.find_element_by_id("signInButton").click()
time.sleep(2)
alert = driver.switch_to.alert
assert alert.text == wrong_credential_message, "incorrect alert with wrong email"
alert.accept()
driver.close()

# wrong password
wrong_password = "hello"
# code
driver = Chrome("chromedriver.exe")
goToAdminLoginFromIndex(driver)
driver.find_element_by_id("email").send_keys(correct_email)
driver.find_element_by_id("password").send_keys(wrong_password)
driver.find_element_by_id("signInButton").click()
time.sleep(2)
alert = driver.switch_to.alert
assert alert.text == wrong_credential_message, "Incorrect alert with wrong email"
alert.accept()
driver.close()

# trying to login as student in admin system
student_email = "test1"
student_password = "hi"
incorrect_system_message = "Server said: Your account requires the Student login."
# code
driver = Chrome("chromedriver.exe")
goToAdminLoginFromIndex(driver)
driver.find_element_by_id("email").send_keys(student_email)
driver.find_element_by_id("password").send_keys(student_password)
driver.find_element_by_id("signInButton").click()
time.sleep(2)
alert = driver.switch_to.alert
assert alert.text == incorrect_system_message, "Incorrect alert with wrong email"
alert.accept()
driver.close()
