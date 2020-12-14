# viewing email
# ====================
# click email0 to view it => we may want to send an email and to receive an email so that email0 is a controlled email => we can just use Isaac's scripts
# for basic and intermediate =>
# check if correct url
# check if correct title
# check if email filled in
# for student and specialist =>
# check if viewEmail div filled in

from selenium.webdriver import Chrome
import time

# MAKE SURE THAT email0 is an email with all fields filled including Cc

index_url = "http://ugdev.cs.smu.ca/~group7/index.html"


def getToStudentScreen(email, password, system):
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

# basic view
# inbox


def testViewEmailWithDifferentScreen(email, password, level):
    driver = getToStudentScreen(email, password, level)
    email = driver.find_element_by_id("email0")
    email.find_element_by_css_selector("div.clickToView").click()
    time.sleep(4)
    assert driver.current_url == "http://ugdev.cs.smu.ca/~group7/Student_" + \
        level + "/viewInbox.html", "did not redirect to view inbox"
    time.sleep(2)
    # check if email loaded
    assert driver.find_element_by_id("partnerTextBox").get_attribute(
        "value") != "", "did not load From"
    assert driver.find_element_by_id("CcTextBox").get_attribute(
        "value") != "", "did not load Cc"
    assert driver.find_element_by_id("SubjectTextBox").get_attribute(
        "value") != "", "did not load Subject"
    assert driver.find_element_by_id("BodyTextBox").get_attribute(
        "value") != "", "did not load Body"
    # check for reply button and that it redirecets to compose main
    driver.find_element_by_id("replyButton").click()
    time.sleep(2)
    assert driver.current_url == "http://ugdev.cs.smu.ca/~group7/ComposeScreens/studentCompose.html", "reply did not work"
    driver.find_element_by_class_name("cancelButton").click()
    time.sleep(2)
    assert driver.current_url == "http://ugdev.cs.smu.ca/~group7/Student_" + \
        level + "/viewInbox.html", "reply cancel did not work"
    driver.find_element_by_id("backButton").click()
    time.sleep(2)
    driver.switch_to.alert.accept()
    assert driver.current_url == "http://ugdev.cs.smu.ca/~group7/Student_" + \
        level + "/inbox.html", "return back from viewInbox did not work"
    if (level != "Basic"):
        driver.find_element_by_id("officeButton").click()
        time.sleep(1)
    driver.find_element_by_id("sentItemButton").click()
    time.sleep(2)
    email = driver.find_element_by_id("email0")
    email.find_element_by_css_selector("div.clickToView").click()
    time.sleep(4)
    assert driver.current_url == "http://ugdev.cs.smu.ca/~group7/Student_" + \
        level + "/viewSent.html", "did not redirect to view sent item"
    # check if email loaded
    assert driver.find_element_by_id("partnerTextBox").get_attribute(
        "value") != "", "did not load To"
    assert driver.find_element_by_id("CcTextBox").get_attribute(
        "value") != "", "did not load Cc"
    assert driver.find_element_by_id("SubjectTextBox").get_attribute(
        "value") != "", "did not load Subject"
    assert driver.find_element_by_id("BodyTextBox").get_attribute(
        "value") != "", "did not load Body"
    driver.find_element_by_id("backButton").click()
    time.sleep(2)
    assert driver.current_url == "http://ugdev.cs.smu.ca/~group7/Student_" + \
        level + "/sentItems.html", "did not redirect back from view sent"
    driver.close()


def testViewEmailWithComponent(selection, email, password):
    driver = Chrome("chromeDriver.exe")
    driver.get(index_url)
    driver.find_element_by_id(selection).click()
    driver.find_element_by_id("email").send_keys(email)
    driver.find_element_by_id("password").send_keys(password)
    if (selection == "studentSelection"):
        driver.find_element_by_id("Advanced").click()
    driver.find_element_by_id("signInButton").click()
    time.sleep(3)
    driver.switch_to.alert.accept()
    time.sleep(3)
    driver.switch_to.alert.accept()
    email = driver.find_element_by_id("email0")
    email.find_element_by_css_selector("div.clickToView").click()
    time.sleep(3)
    assert driver.find_element_by_id("WhoTextBox").get_attribute(
        "value") != "", "whoTextBox did not load"
    assert driver.find_element_by_id("CcTextBox").get_attribute(
        "value") != "", "did not load Cc"
    assert driver.find_element_by_id("SubjectTextBox").get_attribute(
        "value") != "", "did not load Subject"
    assert driver.find_element_by_id("BodyTextBox").get_attribute(
        "value") != "", "did not load Body"
    driver.find_element_by_id("closeViewEmail").click()
    time.sleep(1)
    assert driver.find_element_by_id("ViewingEmail").value_of_css_property(
        "display") == "none", "viewEmailDidnot disappear"
    driver.find_element_by_id("officeButton").click()
    time.sleep(1)
    driver.find_element_by_id("sentItemsButton").click()
    time.sleep(2)
    email = driver.find_element_by_id("email0")
    email.find_element_by_css_selector("div.clickToView").click()
    time.sleep(3)
    assert driver.find_element_by_id("WhoTextBox").get_attribute(
        "value") != "", "whoTextBox did not load"
    assert driver.find_element_by_id("CcTextBox").get_attribute(
        "value") != "", "did not load Cc"
    assert driver.find_element_by_id("SubjectTextBox").get_attribute(
        "value") != "", "did not load Subject"
    assert driver.find_element_by_id("BodyTextBox").get_attribute(
        "value") != "", "did not load Body"
    driver.find_element_by_id("closeViewEmail").click()
    time.sleep(1)
    assert driver.find_element_by_id("ViewingEmail").value_of_css_property(
        "display") == "none", "viewEmailDidnot disappear"
    driver.close()


testViewEmailWithDifferentScreen("test1", "hi", "Basic")
testViewEmailWithDifferentScreen("test1", "hi", "Intermediate")
testViewEmailWithComponent("studentSelection", "test1", "hi")
testViewEmailWithComponent("specialistSelection", "testSpecialist1", "hi")
