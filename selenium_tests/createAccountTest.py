# Humaid Agowun

from selenium.webdriver import Chrome
import time

# We use the same create account for both student and specialist
# we can test all the common messages from specialist itself
# and only do a few test in student side

index_url = "http://ugdev.cs.smu.ca/~group7/index.html"
index_title = "Autism NS pre-login"
specialist_login_url = "http://ugdev.cs.smu.ca/~group7/specialistLogin.html"
specialist_login_title = "Specialist Login"

student_login_url = "http://ugdev.cs.smu.ca/~group7/studentLogin.html"
student_login_title = "Student Login"


def goToCreateAccountSpecialist():
    driver = Chrome("chromedriver.exe")
    driver.get(index_url)
    driver.find_element_by_id("specialistSelection").click()
    time.sleep(3)
    driver.find_element_by_id("createAccountButton").click()
    return driver


def goToCreateAccountStudent():
    driver = Chrome("chromedriver.exe")
    driver.get(index_url)
    driver.find_element_by_id("studentSelection").click()
    time.sleep(3)
    driver.find_element_by_id("createAccountButton").click()
    return driver


def fillInCreateAccountForm(driver, email, password, retypedPassword, secret):
    driver.find_element_by_id("email").send_keys(email)
    driver.find_element_by_id("password").send_keys(password)
    driver.find_element_by_id("retypePassword").send_keys(retypedPassword)
    driver.find_element_by_id("secret").send_keys(secret)
    driver.find_element_by_id("createAccountButton").click()


correct_email_student = "test2"
correct_email_specialist = "testSpecialist2"
password = "hi"
retyped_password_correct = "hi"
specialist_secret = "MANIPULATE_SPECIAL"


# 1. email contains blank space
email_with_spaces = "test Specialist"
spaces_in_email_msg = "Your email address must not contain any blank spaces."
# code
driver = goToCreateAccountSpecialist()
fillInCreateAccountForm(driver, email_with_spaces,
                        password, retyped_password_correct, specialist_secret)
time.sleep(3)
alert = driver.switch_to.alert
assert alert.text == spaces_in_email_msg, "wrong message when too many spaces"
alert.accept()
driver.close()

# 2. passwords dont match
retyped_password_incorrect = "hello"
incorrect_retyped_password_msg = "Your password and the retyped password do not match."
driver = goToCreateAccountSpecialist()
fillInCreateAccountForm(driver, correct_email_specialist,
                        password, retyped_password_incorrect, specialist_secret)
time.sleep(3)
alert = driver.switch_to.alert
assert alert.text == incorrect_retyped_password_msg, "wrong message for incorrect retyped"
alert.accept()
driver.close()

# 3. wrong secret - same for both student and specialist
incorrect_secret = "MANIPULATE"
incorrect_secret_msg = "Error in creating your account.\nServer said: Wrong secret passed."
# code
driver = goToCreateAccountSpecialist()
fillInCreateAccountForm(driver, correct_email_specialist,
                        password, retyped_password_correct, incorrect_secret)
time.sleep(3)
alert = driver.switch_to.alert
assert alert.text == incorrect_secret_msg, "wrong message for wrong secret specialist"
alert.accept()
driver.close()

# 4. email already taken - same message for both student and specialist
already_taken_email = "testSpecialist1"
already_taken_email_msg = "Error in creating your account.\nServer said: Email address already taken."
driver = goToCreateAccountSpecialist()
fillInCreateAccountForm(driver, already_taken_email,
                        password, retyped_password_correct, specialist_secret)
time.sleep(3)
alert = driver.switch_to.alert
assert alert.text == already_taken_email_msg, "wrong message when email already taken"
alert.accept()
driver.close()
