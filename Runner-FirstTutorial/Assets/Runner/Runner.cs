using UnityEngine;

public class Runner : MonoBehaviour {
	
	public static float distanceTraveled;
	
	public float acceleration;
	
	private bool touchingPlatform;
	
	public Vector3 jumpVelocity;
	public Vector3 jumpBackVelocity;
	
	void Update () {
		if(touchingPlatform && Input.GetButtonDown("Jump")){
			rigidbody.AddForce(jumpVelocity, ForceMode.VelocityChange);
		}
		else if(touchingPlatform && Input.GetButtonDown("JumpBack")){
			rigidbody.AddForce(jumpBackVelocity, ForceMode.VelocityChange);
		}
		distanceTraveled = transform.localPosition.x;
	}
	
	void FixedUpdate () {
		if(touchingPlatform){
			rigidbody.AddForce(acceleration, 0f, 0f, ForceMode.Acceleration);
		}
	}
	
	void OnCollisionEnter () {
		touchingPlatform = true;
	}
	
	void OnCollisionExit () {
		touchingPlatform = false;
	}
}