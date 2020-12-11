# check that in all 3 systems => clicking compose sends you to the studentComposeMain.html
# Need to do so from ALL pages:
  # inbox, sent items, viewInbox and viewSent for both basic and intermediate BUT viewSent doesn't have a compose link.
  # mainPage for student advanced
from selenium.webdriver import Chrome
import time
import re

index_url = "http://ugdev.cs.smu.ca/~group7/index.html"
student_email = "StudentTest"
student_password = "testing"
compose_system_title = "Your Email System"
formal_system_url = "http://ugdev.cs.smu.ca/~group7/ComposeScreens/studentComposeFormal.html"
informal_system_url = "http://ugdev.cs.smu.ca/~group7/ComposeScreens/studentComposeInformal.html"
basic_viewInbox_url = "http://ugdev.cs.smu.ca/~group7/Student_Basic/viewInbox.html"
intermediate_viewInbox_url = "http://ugdev.cs.smu.ca/~group7/Student_Intermediate/viewInbox.html"


def testAccessBasic(system, viewInboxURL):
  driver = Chrome()
  driver.get(index_url)
  driver.execute_script("javascript:changeToStudent()")
  time.sleep(3)
  driver.find_element_by_id('email').send_keys(student_email)
  driver.find_element_by_id('password').send_keys(student_password)
  driver.find_element_by_id(system).click()
  driver.execute_script("javascript:LoginStudent()")
  time.sleep(3)
  alert = driver.switch_to.alert
  alert.accept()
  time.sleep(3)
  #inbox
  alert = driver.switch_to.alert
  alert.accept()
  time.sleep(3)
  driver.find_element_by_id("composeButton").click()
  #formal
  driver.find_element_by_id("formalButton").click()
  time.sleep(4)
  assert driver.title == compose_system_title, "wrong compose system title"
  assert driver.current_url == formal_system_url, "wrong formal system url"
  driver.find_element_by_id("cancelButton").click()
  alert = driver.switch_to.alert
  alert.accept()
  time.sleep(3)
  #informal
  driver.find_element_by_id("informalButton").click()
  time.sleep(4)
  assert driver.title == compose_system_title, "wrong compose system title"
  assert driver.current_url == informal_system_url, "wrong formal system url"
  driver.find_element_by_id("cancelButton").click()
  alert = driver.switch_to.alert
  alert.accept()
  time.sleep(3)
  #inbox
  driver.execute_script("javascript:back()")
  time.sleep(4)
  alert = driver.switch_to.alert
  alert.accept()
  time.sleep(3)
  driver.find_element_by_id("sentItemButton").click()
  time.sleep(4)
  #sent items
  driver.find_element_by_id("composeButton").click()
  #formal
  driver.find_element_by_id("formalButton").click()
  time.sleep(4)
  assert driver.title == compose_system_title, "wrong compose system title"
  assert driver.current_url == formal_system_url, "wrong formal system url"
  driver.find_element_by_id("cancelButton").click()
  alert = driver.switch_to.alert
  alert.accept()
  time.sleep(3)
  #informal
  driver.find_element_by_id("informalButton").click()
  time.sleep(4)
  assert driver.title == compose_system_title, "wrong compose system title"
  assert driver.current_url == informal_system_url, "wrong formal system url"
  driver.find_element_by_id("cancelButton").click()
  alert = driver.switch_to.alert
  alert.accept()
  time.sleep(3)
  driver.execute_script("javascript:back()")
  #sent items
  time.sleep(3)
  driver.find_element_by_id("inboxButton").click()
  time.sleep(3)
  alert = driver.switch_to.alert
  alert.accept()
  time.sleep(3)
  #check if there are emails
  email = driver.find_element_by_id("email0")
  assert email != None, "email0 not present"
  #viewing email
  email.find_element_by_css_selector("div.clickToView").click()
  time.sleep(4)
  assert driver.current_url == viewInboxURL, "wrong viewInbox url"
  driver.find_element_by_id("replyButton").click()
  time.sleep(3)
  #formal
  driver.find_element_by_id("formalButton").click()
  time.sleep(4)
  assert driver.title == compose_system_title, "wrong compose system title"
  assert driver.current_url == formal_system_url, "wrong formal system url"
  driver.find_element_by_id("cancelButton").click()
  alert = driver.switch_to.alert
  alert.accept()
  time.sleep(3)
  #informal
  driver.find_element_by_id("informalButton").click()
  time.sleep(4)
  assert driver.title == compose_system_title, "wrong compose system title"
  assert driver.current_url == informal_system_url, "wrong formal system url"
  driver.find_element_by_id("cancelButton").click()
  alert = driver.switch_to.alert
  alert.accept()
  time.sleep(3)
  driver.close()

testAccessBasic("Basic", basic_viewInbox_url)
# works for Basic
#testAccessBasicIntermediate("Intermediate", intermediate_viewInbox_url)

