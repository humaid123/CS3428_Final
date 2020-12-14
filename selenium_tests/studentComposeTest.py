# Humaid Agowun

# login from student basic => click compose => choose informal
# login from student basic => click compose => choose formal
# login student basic => click compose
# 1. compose an email without error and check all checkboxes
# 2. compose an email without error => dont check one checkbox for To, CC, Subject, Creeting, Closure, Body
# => do it it in sequence => compose => click send email
# => check alert => check To checkboxes => click send email
# => check alert => check CC checkboxes => click send email
# => keep doing so until the email is sent //use assert on the alert message
# 3. click all checkboxes => compose without to, to and cc repeated
# 4. compose with fake cc, with fake to

from selenium.webdriver import Chrome
import time

# we can male this test better by knowing the actual hint text and checkbox test from Chrystal

index_url = "http://ugdev.cs.smu.ca/~group7/index.html"
student_email = "test1"
specialist_email = "testSpecialist1"
password = "hi"

# for student the same module takes care of all of the above we test it only we basic system


def getToStudentScreen(email, system):
    driver = Chrome("chromedriver.exe")
    driver.get(index_url)
    driver.find_element_by_id("studentSelection").click()
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
    return driver

# WE have only ONE compose system for the student that is referenced by all the other pages
# we will thus use basic system to do all the tests as it is the one with everything loaded.


def sendCorrectEmail(selection):
    driver = getToStudentScreen("test1", "Basic")
    driver.find_element_by_id("composeButton").click()
    time.sleep(1)
    driver.find_element_by_id(selection).click()
    time.sleep(1)
    testInputField(driver, "To", "ToDropDown", "testSpecialist1")
    time.sleep(1)
    testInputField(driver, "Cc", "CcDropDown", "hum")
    time.sleep(1)
    testInputField(driver, "Subject", "SubjectTextBox", "hi")
    time.sleep(1)
    testInputField(driver, "Greeting", "GreetingTextBox", "Hello, test1 here")
    time.sleep(1)
    testInputField(driver, "Body", "BodyTextBox", "How are you?")
    time.sleep(1)
    testInputField(driver, "Closure", "ClosureTextBox", "Bye")
    time.sleep(1)
    driver.find_element_by_id("sendButton").click()
    time.sleep(4)
    alert = driver.switch_to.alert
    assert alert.text == "Email successfully sent.", "wrong alert with correct email"
    alert.accept()
    time.sleep(1)
    driver.switch_to.alert.accept()
    time.sleep(1)
    assert driver.current_url == "http://ugdev.cs.smu.ca/~group7/Student_Basic/inbox.html", "did not bring back after sending"
    driver.close()


def testInputField(driver, divId, div, value, clickEverything=True):
    driver.find_element_by_id(div).click()
    driver.find_element_by_id(div).send_keys(value)
    time.sleep(1)
    lst = driver.find_element_by_id(divId + "HintList")
    items = lst.find_elements_by_css_selector("li.hintListItem")
    for hint in items:
        assert hint.get_attribute("innerHTML") != "", "empty hint in " + divId
    lst = driver.find_element_by_id(divId + "CheckBoxList")
    items = lst.find_elements_by_css_selector("li.checkboxElement")
    count = 0
    for checkBox in items:
        assert checkBox.get_attribute(
            "innerHTML") != "", "empty checkbox in " + divId
        driver.find_element_by_id(divId + "CheckBox" + str(count)).click()
        count += 1
    if (not clickEverything):
        # we unclick one of the checkboxes
        driver.find_element_by_id(divId + "CheckBox0").click()
    hidden_div = driver.find_element_by_id(divId + "Hidden")
    hidden_div.find_element_by_css_selector(
        "button.checkedEverythingButton").click()
    time.sleep(1)


def testCheckBoxFor(driver, divId, div, value):
    # will unclick the first checkbox
    testInputField(driver, divId, div, value, False)
    driver.find_element_by_id("sendButton").click()
    time.sleep(1)
    alert = driver.switch_to.alert
    assert alert.text == "Cannot send as you have not checked everything for: " + \
        divId + ".", "wrong alert for not checked: " + divId
    alert.accept()
    # click back unclicked item
    driver.find_element_by_id(div).click()
    time.sleep(1)
    driver.find_element_by_id(divId + "CheckBox0").click()
    hidden_div = driver.find_element_by_id(divId + "Hidden")
    hidden_div.find_element_by_css_selector(
        "button.checkedEverythingButton").click()


def verifySendingUncheckedEmailInSequence(selection):
    driver = getToStudentScreen("test1", "Basic")
    driver.find_element_by_id("composeButton").click()
    time.sleep(1)
    driver.find_element_by_id(selection).click()
    time.sleep(1)
    testCheckBoxFor(driver, "To", "ToDropDown", "testSpecialist1")
    time.sleep(1)
    testCheckBoxFor(driver, "Cc", "CcDropDown", "hum")
    time.sleep(1)
    testCheckBoxFor(driver, "Subject", "SubjectTextBox", "hi")
    time.sleep(1)
    testCheckBoxFor(driver, "Greeting", "GreetingTextBox", "Hello, test1 here")
    time.sleep(1)
    testCheckBoxFor(driver, "Body", "BodyTextBox", "How are you?")
    time.sleep(1)
    testCheckBoxFor(driver, "Closure", "ClosureTextBox", "Bye")
    time.sleep(1)
    driver.find_element_by_id("sendButton").click()
    time.sleep(4)
    alert = driver.switch_to.alert
    assert alert.text == "Email successfully sent.", "wrong alert with correct email"
    alert.accept()
    time.sleep(1)
    driver.switch_to.alert.accept()
    time.sleep(1)
    assert driver.current_url == "http://ugdev.cs.smu.ca/~group7/Student_Basic/inbox.html", "did not bring back after sending"
    driver.close()


def verifyWithTheFollowing(selection, to, cc, expected_error_msg):
    driver = getToStudentScreen("test1", "Basic")
    driver.find_element_by_id("composeButton").click()
    time.sleep(1)
    driver.find_element_by_id(selection).click()
    time.sleep(1)
    testInputField(driver, "To", "ToDropDown", to)
    time.sleep(1)
    testInputField(driver, "Cc", "CcDropDown", cc)
    time.sleep(1)
    testInputField(driver, "Subject", "SubjectTextBox", "hi")
    time.sleep(1)
    testInputField(driver, "Greeting", "GreetingTextBox", "Hello, test1 here")
    time.sleep(1)
    testInputField(driver, "Body", "BodyTextBox", "How are you?")
    time.sleep(1)
    testInputField(driver, "Closure", "ClosureTextBox", "Bye")
    time.sleep(1)
    driver.find_element_by_id("sendButton").click()
    time.sleep(4)
    alert = driver.switch_to.alert
    assert alert.text == expected_error_msg, "wrong alert with to = " + to + ", | cc = " + cc
    alert.accept()
    driver.close()


sendCorrectEmail("formalButton")
sendCorrectEmail("informalButton")
# check alert when one checkbox not clicked one by one
verifySendingUncheckedEmailInSequence("formalButton")
verifySendingUncheckedEmailInSequence("informalButton")
# no to
verifyWithTheFollowing("formalButton", "", "test1",
                       "Could not send email.\nServer said: Could not find receiver: .")
verifyWithTheFollowing("informalButton", "", "test1",
                       "Could not send email.\nServer said: Could not find receiver: .")
# to and cc repeated
verifyWithTheFollowing("formalButton", "testSpecialist1", "testSpecialist1",
                       "Sent email to everyone except: testSpecialist1.")
verifyWithTheFollowing("informalButton", "testSpecialist1",
                       "testSpecialist1", "Sent email to everyone except: testSpecialist1.")
# fake to
verifyWithTheFollowing("formalButton", "FAKE_EMAIL", "testSpecialist1",
                       "Could not send email.\nServer said: Could not find receiver: FAKE_EMAIL.")
verifyWithTheFollowing("informalButton", "FAKE_EMAIL", "testSpecialist1",
                       "Could not send email.\nServer said: Could not find receiver: FAKE_EMAIL.")
# fake cc
verifyWithTheFollowing("formalButton", "testSpecialist1", "FAKE_EMAIL",
                       "Could not send email.\nServer said: Could not find cced person: FAKE_EMAIL.")
verifyWithTheFollowing("informalButton", "testSpecialist1", "FAKE_EMAIL",
                       "Could not send email.\nServer said: Could not find cced person: FAKE_EMAIL.")
