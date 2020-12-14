from selenium.webdriver import Chrome
import time

# click check box => click check box for email0 and see what happens
# i guess we can check css classnames

index_url = "http://ugdev.cs.smu.ca/~group7/index.html"
student_email = "test1"
specialist_email = "testSpecialist1"
password = "hi"

# for student the same module takes care of all of the above we test it only we basic system


def testCheckbox(email, selection, system):
    driver = Chrome("chromedriver.exe")
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
    CHECKED = '<i class="fa fa-flag" style="color:red;" aria-hidden="true"></i>TO DO'
    NOT_CHECKED = '<i class="fa fa-flag-o" aria-hidden="true"></i> DONE'
    checkBox0 = driver.find_element_by_id("CheckBox0")
    innerHTML = checkBox0.get_attribute('innerHTML')
    assert innerHTML == CHECKED or innerHTML == NOT_CHECKED, "unrecognised innerHTML for CheckBox0"
    checkBox0.click()
    time.sleep(1)
    newInnerHTML = checkBox0.get_attribute("innerHTML")
    if (innerHTML == CHECKED):
        assert newInnerHTML == NOT_CHECKED, "wrong change in innerHTML when clicked"
    else:
        assert newInnerHTML == CHECKED, "wrong change in innerHTML when clicked"
    driver.close()


testCheckbox(student_email, "studentSelection", "Basic")
testCheckbox(student_email, "studentSelection", "Intermediate")
testCheckbox(student_email, "studentSelection", "Basic")
testCheckbox(specialist_email, "specialistSelection", None)
